import axios from 'axios';
import config from '../../../../config';
import moment from 'moment';
import _ from 'lodash';
import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common';
import { ExchangeOrmEntity } from '../entities/exchange.orm-entity';
import { ApikeyExchangeBrokerOrmEntity } from '../entities/apikey-exchange-broker.orm-entity';
import { RefkeyExchangeBrokerOrmEntity } from '../entities/refkey-exchange-broker.orm-entity';
import { ApiKeysService } from '../../api-keys/api-keys.service';
import { RefKeysService } from '../../ref-keys/ref-keys.service';
import { ExchangeAffiliateStatsResponseDto } from '../dto/exchange-affiliate-stats-response.dto';
import { Op, QueryTypes } from 'sequelize';
import { TDailyStats, TStats } from '../interfaces/exchange.type';
import { ExchangeDailyStatsResponse } from '../dto/exchange-daily-stats-response';
import { ExchangeAffiliateDailyStatsResponseDto } from '../dto/exchange-affiliate-daily-stats-response.dto';
import { StatusesExchange } from '../../../shared/enum/statusesExchange';
import { ExchangeResponse } from '../dto/exchange-response';
import { ApikeyExchangeStatusTypes } from '../../../shared/enum/apikeyExchangeStatusTypes';
import { ApiKeyEntity } from '../../api-keys/entities/api-key.entity';
import { RefKeyEntity } from '../../ref-keys/entities/ref-key.entity';
import { CreateExchangeDto } from '../dto/create-exchange.dto';
import { CoreExchangeAdapter } from '../adapters/core-exchange.adapter';
import { CreateCoreExchangePort } from '../../../domain/ports/secondary/create-core-exchange.port';
import { CreateAndSaveExchangeUseCase } from '../../../domain/use-cases/create-and-save-exchange.use-case';
import { SaveExchangePort } from '../../../domain/ports/secondary/save-exchange.port';
import { PostgresAdapter } from '../adapters/postgres.adapter';
import { ExchangeMapper } from '../mappers/exchange.mapper';
import { ExchangeDto } from '../dto/exchange.dto';

@Injectable()
export class ExchangeService {
	protected readonly _provider: CreateCoreExchangePort;
	protected readonly _dataBase: SaveExchangePort;
	protected readonly _createAndSaveExchangeUseCase: CreateAndSaveExchangeUseCase;
	protected readonly _mapper: ExchangeMapper;

	constructor(
		@Inject('ExchangesRepository')
		protected readonly repository: typeof ExchangeOrmEntity,
		@Inject('ApikeyExchangeBrokerRepository')
		protected readonly apikeyExchangeBroker: typeof ApikeyExchangeBrokerOrmEntity,
		@Inject('RefkeyExchangeBrokerRepository')
		protected readonly refkeyExchangeBroker: typeof RefkeyExchangeBrokerOrmEntity,
		protected readonly apiKeyService: ApiKeysService,
		protected readonly refKeyService: RefKeysService,
		protected readonly logger: Logger,
	) {
		this._mapper = new ExchangeMapper();
		this._provider = new CoreExchangeAdapter();
		this._dataBase = new PostgresAdapter();
		this._createAndSaveExchangeUseCase = new CreateAndSaveExchangeUseCase(this._provider, this._dataBase);
	}

	async createExchange(data: CreateExchangeDto): Promise<ExchangeDto> {
		try {
			const apiKey = this._createAndSaveExchangeUseCase.validateApiKey(data.apiKey, config.ssApiKey);
			const referral = this._createAndSaveExchangeUseCase.validateReferral(data.referral);
			const fixed = this._createAndSaveExchangeUseCase.validateFixed(data.fixed);
			const exchange = await this._createAndSaveExchangeUseCase.createExchange(
				apiKey, referral, fixed, data.currencyFrom, data.currencyTo, data.addressTo, data.amount, data.extraIdTo,
			);
			return this._mapper.domainToDto(exchange);
		} catch (e) {
			throw new BadRequestException(e);
		}
	}

	async getAffiliateStats(apiKeys: string[], refKeys: string[]): Promise<ExchangeAffiliateStatsResponseDto> {
		try {
			let apiKeyIds = apiKeys.length !== 0 ?
				await this.apiKeyService.findByApiKeys(apiKeys) :
				[0];
			apiKeyIds = apiKeyIds.length !== 0 ? apiKeyIds : [0];
			let refKeyIds = refKeys.length !== 0 ?
				await this.refKeyService.findByRefKeys(refKeys) :
				[0];
			refKeyIds = refKeyIds.length !== 0 ? refKeyIds : [0];

			const { count } = await this.repository.findAndCountAll<ExchangeOrmEntity>({
				where: {
					[Op.or]: [
						{ apiKeyId: { [Op.in]: apiKeyIds } },
						{ refKeyId: { [Op.in]: refKeyIds } },
					],
				},
			});

			const respProfit: TStats[] = await this.repository.sequelize.query(`
				SELECT round(sum(amount_to_btc), 6) as amount_to_btc, round(sum(partner_profit_btc), 6) as partner_profit_btc
				FROM exchanges
				WHERE (api_key_id in (:apiKeyIds) or ref_key_id in (:refKeyIds)) and status in ('finished') and partner_paid_out=false;`,
				{
					replacements: { apiKeyIds, refKeyIds },
					type: QueryTypes.SELECT,
				},
			);

			const respAmount: TStats[] = await this.repository.sequelize.query(`
				SELECT round(sum(amount_to_btc), 6) as amount_to_btc, round(sum(partner_profit_btc), 6) as partner_profit_btc
				FROM exchanges
				WHERE (api_key_id in (:apiKeyIds) or ref_key_id in (:refKeyIds)) and status in ('finished');`,
				{
					replacements: { apiKeyIds, refKeyIds },
					type: QueryTypes.SELECT,
				},
			);

			return new ExchangeAffiliateStatsResponseDto(
				respAmount[0].amount_to_btc,
				respProfit[0].partner_profit_btc,
				respProfit[0].partner_profit_btc,
				count,
				0.4,
			);
		} catch (e) {
			throw new BadRequestException(e.message);
		}
	}


	async getAffiliateDailyStats(
		apiKeys: string[],
		refKeys: string[],
		limit: number,
		page: number,
		startDate: string,
		finishDate: string,
	): Promise<ExchangeDailyStatsResponse> {
		try {
			limit = limit || 10;
			page = page || 1;
			const startDateFilter = startDate || '1970-01-01';
			const finishDateFilter = finishDate || '9999-12-31';
			const offset = (page - 1) * limit;
			let apiKeyIds = apiKeys.length !== 0 ?
				await this.apiKeyService.findByApiKeys(apiKeys) :
				[0];
			apiKeyIds = apiKeyIds.length !== 0 ? apiKeyIds : [0];
			let refKeyIds = refKeys.length !== 0 ?
				await this.refKeyService.findByRefKeys(refKeys) :
				[0];
			refKeyIds = refKeyIds.length !== 0 ? refKeyIds : [0];


			const resp: TDailyStats[] = await this.repository.sequelize.query(`
				SELECT date(timestamp) AS created_at,
							 count(date(timestamp)) AS count,
							 count(date(timestamp)) FILTER ( WHERE status='finished' ) AS finished,
							 count(date(timestamp)) FILTER ( WHERE status='waiting' ) AS waiting,
							 count(date(timestamp)) FILTER ( WHERE status='failed' ) AS failed,
							 round(sum(amount_to_btc) FILTER ( WHERE status='finished' ), 6) AS amount_to_btc,
							 round(sum(partner_profit_btc) FILTER ( WHERE status='finished' ), 6) AS partner_profit_btc
				FROM exchanges
				WHERE (api_key_id IN (:apiKeyIds) OR ref_key_id IN (:refKeyIds))
				AND (date(timestamp) <= :finishDateFilter AND date(timestamp) >= :startDateFilter)
				GROUP BY date(timestamp)
				ORDER BY date(timestamp) DESC
				LIMIT :limit
				OFFSET :offset;`,
				{
					replacements: { apiKeyIds, refKeyIds, limit, offset, finishDateFilter, startDateFilter },
					type: QueryTypes.SELECT,
				},
			);

			const filter: TDailyStats[] = await this.repository.sequelize.query(`
				SELECT date(timestamp) AS created_at,
							 count(date(timestamp)) AS count,
							 count(date(timestamp)) FILTER ( WHERE status='finished' ) AS finished,
							 count(date(timestamp)) FILTER ( WHERE status='waiting' ) AS waiting,
							 count(date(timestamp)) FILTER ( WHERE status='failed' ) AS failed,
							 round(sum(amount_to_btc) FILTER ( WHERE status='finished' ), 6) AS amount_to_btc,
							 round(sum(partner_profit_btc) FILTER ( WHERE status='finished' ), 6) AS partner_profit_btc
				FROM exchanges
				WHERE (api_key_id IN (:apiKeyIds) OR ref_key_id IN (:refKeyIds))
				AND (date(timestamp) <= :finishDateFilter AND date(timestamp) >= :startDateFilter)
				GROUP BY date(timestamp)
				ORDER BY date(timestamp) DESC;`,
				{
					replacements: { apiKeyIds, refKeyIds, finishDateFilter, startDateFilter },
					type: QueryTypes.SELECT,
				},
			);

			const { data } = await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD`, {
				headers: {
					authorization: config.cryptocompare,
				},
			});

			return {
				startDate: startDate ? moment(startDate).format('YYYY-MM-DD') : _.last(resp.map(item => item.created_at)),
				finishDate: finishDate ? moment(finishDate).format('YYYY-MM-DD') : _.first(resp.map(item => item.created_at)),
				countAll: filter.length,
				countRows: resp.length,
				countPages: Math.ceil(filter.length / limit),
				page,
				rows: resp.map(item => new ExchangeAffiliateDailyStatsResponseDto(
					item.created_at,
					item.count,
					item.finished,
					item.failed,
					item.amount_to_btc,
					item.partner_profit_btc,
					data.USD * item.amount_to_btc,
					data.USD * item.partner_profit_btc,
				)),
			};
		} catch (e) {
			throw new BadRequestException(e.message);
		}
	}


	async getAffiliateHistory(
		apiKeys: string[],
		refKeys: string[],
		limit: number,
		page: number,
		status: StatusesExchange,
		currencyFrom: string,
		currencyTo: string,
		startDate: string,
		finishDate: string,
	): Promise<ExchangeResponse> {
		try {
			let apiKeyIds;
			let refKeyIds;
			if (apiKeys.length !== 0) {
				apiKeyIds = await this.apiKeyService.findByApiKeys(apiKeys);
				// tslint:disable-next-line:prefer-for-of
				for (let i = 0; i < apiKeyIds.length; i++) {
					const apiBroker = await this.findApiKeyBrokerByApiKeyId(apiKeyIds[i]);
					if (!apiBroker) {
						await this.setApiKeyBrokerToPostgres([{
							apiKeyId: apiKeyIds[i],
							status: ApikeyExchangeStatusTypes.waiting,
						}]);
					} else {
						if (apiBroker.status !== 'update' && apiBroker.status !== 'waiting') {
							await this.changeStatusApiKeyExchange(apiBroker.id, ApikeyExchangeStatusTypes.waiting);
						}
					}
				}
			} else {
				apiKeyIds = [0];
			}

			if (refKeys.length !== 0) {
				refKeyIds = await this.refKeyService.findByRefKeys(refKeys);
				// tslint:disable-next-line:prefer-for-of
				for (let i = 0; i < refKeyIds.length; i++) {
					const refBroker = await this.findRefKeyBrokerByRefKeyId(refKeyIds[i]);
					if (!refBroker) {
						await this.setRefKeyBrokerToPostgres([{
							refKeyId: refKeyIds[i],
							status: ApikeyExchangeStatusTypes.waiting,
						}]);
					} else {
						if (refBroker.status !== 'update' && refBroker.status !== 'waiting') {
							await this.changeStatusRefKeyExchange(refBroker.id, ApikeyExchangeStatusTypes.waiting);
						}
					}
				}
			} else {
				refKeyIds = [0];
			}

			const offset = (page - 1) * limit;
			const statusWhere = status === StatusesExchange.all ? {} : { status };
			const currencyFromWhere = currencyFrom ? { currencyFrom } : {};
			const currencyToWhere = currencyTo ? { currencyTo } : {};

			let startDateWhere = {};
			let finishDateWhere = {};

			if (startDate) {
				const [startYear, startMonth, startDay] = startDate.split('-');
				startDateWhere = { timestamp: { [Op.gte]: new Date(Number(startYear), Number(startMonth) - 1, Number(startDay)) } };
			}

			if (finishDate) {
				const [finishYear, finishMonth, finishDay] = finishDate.split('-');
				finishDateWhere = { timestamp: { [Op.lte]: new Date(Number(finishYear), Number(finishMonth) - 1, Number(finishDay)) } };
			}


			const where = {
				[Op.or]: [
					{ refKeyId: { [Op.in]: refKeyIds } },
					{ apiKeyId: { [Op.in]: apiKeyIds } },
				],
				...statusWhere,
				...currencyFromWhere,
				...currencyToWhere,
				[Op.and]: [
					{ ...startDateWhere },
					{ ...finishDateWhere },
				],
			};
			const filters = await this.repository.findAndCountAll<ExchangeOrmEntity>({
				where: {
					[Op.or]: [
						{ refKeyId: { [Op.in]: refKeyIds } },
						{ apiKeyId: { [Op.in]: apiKeyIds } },
					],
				},
				order: [['timestamp', 'DESC']],
			});

			const { count, rows } = await this.repository.findAndCountAll<ExchangeOrmEntity>({
				include: [
					{ model: ApiKeyEntity, as: 'apiKey' },
					{ model: RefKeyEntity, as: 'refKey' },
				],
				where,
				limit,
				offset,
				order: [['timestamp', 'DESC']],
			});

			const exchangeMapper = new ExchangeMapper();
			return {
				sources: _.union(apiKeys, refKeys),
				statuses: _.uniq(filters.rows.map(item => item.status)),
				tickersFrom: _.uniq(filters.rows.map(item => item.currencyFrom)),
				tickersTo: _.uniq(filters.rows.map(item => item.currencyTo)),
				startDate: startDate ? moment(startDate).format('YYYY-MM-DD') : moment(_.last(filters.rows.map(item => item.timestamp))).format('YYYY-MM-DD'),
				finishDate: finishDate ? moment(finishDate).format('YYYY-MM-DD') : moment(_.first(filters.rows.map(item => item.timestamp))).format('YYYY-MM-DD'),
				countAll: count,
				countRows: rows.length,
				countPages: Math.ceil(count / limit),
				page,
				rows: rows.map(item => exchangeMapper.ormToDto(item)),
			};
		} catch (e) {
			if (e.parent.code === '22P02') {
				throw new BadRequestException('Is type not found');
			}
			throw new BadRequestException(e);
		}
	}


	async findApiKeyBrokerByApiKeyId(apiKeyId: number) {
		try {
			return await this.apikeyExchangeBroker.findOne({
				where: { apiKeyId },
			});
		} catch (e) {
			throw new BadRequestException(e.message);
		}
	}

	async findRefKeyBrokerByRefKeyId(refKeyId: number) {
		try {
			return await this.refkeyExchangeBroker.findOne({
				where: { refKeyId },
			});
		} catch (e) {
			throw new BadRequestException(e.message);
		}
	}

	async setApiKeyBrokerToPostgres(list: { apiKeyId: number, status: ApikeyExchangeStatusTypes }[]): Promise<number> {
		try {
			const send = await ApikeyExchangeBrokerOrmEntity.bulkCreate(list);
			// this.logger.debug(`[SEND: ${send.length}]`);
			return send.length;
		} catch (e) {
			this.logger.error(`[ERROR:setApiKeyBrokerToPostgres] ${e}`);
		}
	}

	async setRefKeyBrokerToPostgres(list: { refKeyId: number, status: ApikeyExchangeStatusTypes }[]): Promise<number> {
		try {
			const send = await RefkeyExchangeBrokerOrmEntity.bulkCreate(list);
			// this.logger.debug(`[SEND: ${send.length}]`);
			return send.length;
		} catch (e) {
			this.logger.error(`[ERROR:setRefKeyBrokerToPostgres] ${e}`);
		}
	}

	async changeStatusRefKeyExchange(id: number, status: string) {
		try {
			await this.refkeyExchangeBroker.update(
				{ status }, {
					where: {
						id,
					},
				});
		} catch (e) {
			throw new BadRequestException(e);
		}
	}

	async changeStatusApiKeyExchange(id: number, status: string) {
		try {
			await this.apikeyExchangeBroker.update(
				{ status }, {
					where: {
						id,
					},
				});
		} catch (e) {
			throw new BadRequestException(e);
		}
	}

}

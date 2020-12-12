import { BadRequestException } from '@nestjs/common';
import { ExchangeOrmEntity } from '../entities/exchange.orm-entity';
import { exchangeClient } from '../../../libs/core-client';
import { FormatExchangeDto } from '../dto/format-exchange.dto';
import { ApiKeyEntity } from '../../api-keys/entities/api-key.entity';
import { ApikeyExchangeBrokerOrmEntity } from '../entities/apikey-exchange-broker.orm-entity';
import { RefkeyExchangeBrokerOrmEntity } from '../entities/refkey-exchange-broker.orm-entity';
import { ApikeyExchangeStatusTypes } from '../../../shared/enum/apikeyExchangeStatusTypes';
import { ApiKeyExchangeBrokerDto } from '../dto/api-key-exchange-broker.dto';
import { RefKeyExchangeBrokerDto } from '../dto/ref-key-exchange-broker.dto';
import { RefKeyEntity } from '../../ref-keys/entities/ref-key.entity';
import config from '../../../../config';
// import core from 'core-client';
import { ExchangeService } from './exchange.service';

// let APIKEY_UPDATE_ORDER_BY = 'ASC';

export class ExchangeMigrateService extends ExchangeService{


	async migrateAllRefKeyExchanges() {
		try {
			const { count, rows } = await this.findAllRefKeyMigration(
				{ status: ApikeyExchangeStatusTypes.waiting },
				10,
				0,
			);
			if (count !== 0) {
				for (let i = 0; i < count; i++) {
					await this.changeStatusRefKeyExchange(rows[i].id, ApikeyExchangeStatusTypes.update);

					this.logger.debug(`[REF-KEY: ${rows[i].refKeyObject.referral}]`);
					const resp = await this.migrateExchangesFromCorgiByRefKey(rows[i].refKeyObject.referral);

					await this.changeStatusRefKeyExchange(rows[i].id, ApikeyExchangeStatusTypes.success);

					return resp;
				}
			} else {
				return { countSend: 0, countAll: 0 };
			}
		} catch (e) {
			this.logger.debug(`[${e.message}]`);
			return { countSend: 0, countAll: 0 };
		}
	}


	async migrateAllApiKeyExchanges(order) {
		try {
			const { count, rows } = await this.findAllApiKeyMigration(
				{ status: ApikeyExchangeStatusTypes.waiting },
				1,
				0,
				order,
			);
			if (count !== 0) {

					await this.changeStatusApiKeyExchange(rows[0].id, ApikeyExchangeStatusTypes.update);


					this.logger.debug(`[API-KEY: ${rows[0].apiKeyObject.apiKey}]`);
					const resp = await this.migrateExchangesFromCorgiByApiKey(rows[0].apiKeyObject.apiKey);


					await this.changeStatusApiKeyExchange(rows[0].id, ApikeyExchangeStatusTypes.success);

					return resp;
			} else {
				return { countSend: 0, countAll: 0 };
			}
		} catch (e) {
			this.logger.debug(`[${e.message}]`);
			return { countSend: 0, countAll: 0 };
		}
	}



	async findAllApiKeyMigration(where, limit, offset, order) {
		try {
			const { rows } = await this.apikeyExchangeBroker.findAndCountAll<ApikeyExchangeBrokerOrmEntity>({
				include: [{
					model: ApiKeyEntity,
					as: 'apiKeyObject',
				}],
				where,
				limit,
				offset,
				order: [['updated_at', order]],
			});
			return {
				count: rows.length,
				rows: rows.map(item => new ApiKeyExchangeBrokerDto(item)),
			};
		} catch (e) {
			throw new BadRequestException(e);
		}
	}


	async findAllRefKeyMigration(where, limit, offset) {
		try {
			const { rows } = await this.refkeyExchangeBroker.findAndCountAll<RefkeyExchangeBrokerOrmEntity>({
				include: [{
					model: RefKeyEntity,
					as: 'refKeyObject',
				}],
				where,
				limit,
				offset,
				order: [['updated_at', 'ASC']],
			});
			return {
				count: rows.length,
				rows: rows.map(item => new RefKeyExchangeBrokerDto(item)),
			};
		} catch (e) {
			throw new BadRequestException(e);
		}
	}

	async setApiKeysBrokerTable(offset) {
		try {
			const countApikeyBroker = await this.apikeyExchangeBroker.count();
			const countApiKeys = await this.apiKeyService.countApiKeysFromPostgres({});

			if (countApiKeys > countApikeyBroker) {
				const countNumber = Number((countApiKeys / 200).toFixed(0));
				for (let i = 0; i <= countNumber; i++) {

					const apiKeysArray = offset > countApiKeys ?
						await this.apiKeyService.findAll({}, 200, offset + i * 200) :
						await this.apiKeyService.findAll({}, 200, countApikeyBroker + i * 200);


					if (apiKeysArray.rows.length !== 0) {
						const list = apiKeysArray.rows.map(item => {
							return {
								apiKeyId: item.id,
								status: ApikeyExchangeStatusTypes.waiting,
							};
						});
						const resp = await this.setApiKeyBrokerToPostgres(list);
						await this.delay(1000);
						return resp;
					}
				}
			}
		} catch (e) {
			throw new BadRequestException(e);
		}
	}

	async setRefKeysBrokerTable(offset) {
		try {
			const countRefkeyBroker = await this.refkeyExchangeBroker.count();
			const countRefKeys = await this.refKeyService.countRefKeysFromPostgres();

			if (countRefKeys > countRefkeyBroker) {
				const countNumber = Number((countRefKeys / 200).toFixed(0));
				for (let i = 0; i <= countNumber; i++) {

					const refKeysArray = offset > countRefKeys ?
						await this.refKeyService.findAll({}, 200, offset + i * 200) :
						await this.refKeyService.findAll({}, 200, countRefkeyBroker + i * 200);


					if (refKeysArray.rows.length !== 0) {
						const list = refKeysArray.rows.map(item => {
							return {
								refKeyId: item.id,
								status: ApikeyExchangeStatusTypes.waiting,
							};
						});
						const resp = await this.setRefKeyBrokerToPostgres(list);
						await this.delay(1000);
						return resp;
					}
				}
			}
		} catch (e) {
			throw new BadRequestException(e);
		}
	}

	async migrateExchangesFromCorgiByApiKey(apiKey: string) {
		try {
			const limit = 1000;
			let exchanges = [];
			let count = 0;
			let countEvery = 0;
			let index = 0;
			const apiKeyFormPostgres = await this.apiKeyService.findByApiKey(apiKey);
			if (!apiKeyFormPostgres) {
				throw new BadRequestException('No such key was found in the database');
			}
			do {
				const offset = limit * index;
				exchanges = await exchangeClient.getExchanges(
					config.ssApiKey,
					apiKey,
					limit,
					offset,
					{},
					true,
				);
				const exchangesListFormat = exchanges.map(item => new FormatExchangeDto(item, apiKeyFormPostgres.id, null));
				const { countNumber, countAll } = await this.setExchangesToPostgres(exchangesListFormat);
				count += countNumber;
				countEvery += countAll;
				index++;
				await this.delay(100);
			} while (exchanges.length >= 100);
			return { countSend: count, countAll: countEvery };
		} catch (e) {
			this.logger.debug(`[${e.message}]`);
			return { countSend: 0, countAll: 0 };
		}
	}

	async migrateExchangesFromCorgiByRefKey(referral: string) {
		try {
			const limit = 1000;
			let exchanges = [];
			let count = 0;
			let countEvery = 0;
			let index = 0;
			const refKeyFormPostgres = await this.refKeyService.findByRefKey(referral);
			if (!refKeyFormPostgres) {
				throw new BadRequestException('No such refferal was found in the database');
			}
			do {
				const offset = limit * index;
				exchanges = await exchangeClient.getExchanges(
					config.ssApiKey,
					config.ssApiKey,
					limit,
					offset,
					{
						'api_key': {
							'$ne': '-',
						},
						'referral': {
							'$in': [
								referral,
							],
						},
					},
					true,
				);
				const exchangesListFormat = exchanges.map(item => new FormatExchangeDto(item, null, refKeyFormPostgres.id));
				const { countNumber, countAll } = await this.setExchangesToPostgres(exchangesListFormat);
				count += countNumber;
				countEvery += countAll;
				index++;
				await this.delay(100);
			} while (exchanges.length >= 100);
			return { countSend: count, countAll: countEvery };
		} catch (e) {
			this.logger.debug(`[${e.message}]`);
			return { countSend: 0, countAll: 0 };
		}
	}


	async setExchangesToPostgres(list: FormatExchangeDto[]): Promise<{ countNumber: number, countAll: number }> {
		try {
			let count = 0;
			let countErr = 0;
			// tslint:disable-next-line:prefer-for-of
			for (let i = 0; i < list.length; i++) {
				const check = await this.findByObjectId(list[i].objectId);
				if (!check) {
					await this.repository.create(list[i]);
					count++;
				} else {
					const res = await this.statusUpdate(list[i]);
					countErr++;
				}
			}
			// this.logger.debug(`[SEND: ${count} | UPDATE: ${countErr} | ALL: ${count + countErr}]`);
			return { countNumber: count, countAll: countErr + count };
		} catch (e) {
			this.logger.error(`[ERROR:setExchangesToPostgres] ${e}`);
		}
	}

	async statusUpdate(obj: FormatExchangeDto): Promise<{ objectId: string, status: string }> {
		try {
			await ExchangeOrmEntity.update(obj, { where: { objectId: obj.objectId } });
			return this.findByObjectId(obj.objectId);
		} catch (e) {
			throw new BadRequestException(e.message);
		}
	}

	async findByObjectId(objectId: string): Promise<ExchangeOrmEntity> {
		try {
			return await this.repository.findOne<ExchangeOrmEntity>({
				where: { objectId },
			});
		} catch (e) {
			throw new BadRequestException(e.message);
		}
	}

	async delay(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
}

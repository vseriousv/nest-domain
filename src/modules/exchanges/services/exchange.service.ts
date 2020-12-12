import config from '../../../../config';
import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common';
import { CreateExchangeDto } from '../dto/create-exchange.dto';
import { CoreExchangeAdapter } from '../adapters/core-exchange.adapter';
import { CreateCoreExchangePort } from '../../../domain/ports/secondary/create-core-exchange.port';
import { CreateAndSaveExchangeUseCase } from '../../../domain/use-cases/create-and-save-exchange.use-case';
import { SaveExchangePort } from '../../../domain/ports/secondary/save-exchange.port';
import { PostgresAdapter } from '../adapters/postgres.adapter';
import { ExchangeMapper } from '../mappers/exchange.mapper';
import { ExchangeDto } from '../dto/exchange.dto';
import { ExchangeOrmEntity } from '../entities/exchange.orm-entity';

@Injectable()
export class ExchangeService {
	protected readonly _provider: CreateCoreExchangePort;
	protected readonly _dataBase: SaveExchangePort;
	protected readonly _createAndSaveExchangeUseCase: CreateAndSaveExchangeUseCase;
	protected readonly _mapper: ExchangeMapper;

	constructor(
		@Inject('ExchangesRepository')
		protected readonly repository: typeof ExchangeOrmEntity,
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
}

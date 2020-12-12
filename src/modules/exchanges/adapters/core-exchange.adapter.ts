import { CreateCoreExchangePort } from '../../../domain/ports/secondary/create-core-exchange.port';
import { ExchangeEntity } from '../../../domain/entities/exchange.entity';
import { exchangeClient } from '../../../libs/core-client';
import { ExchangeMapper } from '../mappers/exchange.mapper';
import { ICoreExchange } from './core-exchange.interface';
import { CurrencyMapper } from '../../currencies/mappers/currency.mapper';

export class CoreExchangeAdapter implements CreateCoreExchangePort {
	private readonly _exchangeMapper: ExchangeMapper;
	private readonly _currencyMapper: CurrencyMapper;

	constructor() {
		this._exchangeMapper = new ExchangeMapper();
		this._currencyMapper = new CurrencyMapper();
	}

	async createExchange(
		apikey: string,
		referral: string,
		fixed: boolean,
		currencyFrom: string,
		currencyTo: string,
		addressTo: string,
		amount: string,
		extraIdTo: string,
	): Promise<ExchangeEntity> {
		const result: ICoreExchange = await exchangeClient.createExchange(
			`${apikey}#${referral || ''}`,
			fixed,
			currencyFrom,
			currencyTo,
			addressTo,
			amount,
			extraIdTo,
		);
		const currencyFromDomain = this._currencyMapper.coreToDomain(Object.values(result.currencies)[0]);
		const currencyToDomain = this._currencyMapper.coreToDomain(Object.values(result.currencies)[1]);
		return this._exchangeMapper.coreToDomain(result, currencyFromDomain, currencyToDomain);
	}

}

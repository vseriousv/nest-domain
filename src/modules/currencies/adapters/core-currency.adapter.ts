import { GetCoreCurrencyPort } from '../../../domain/ports/secondary/get-core-currency.port';
import { CurrencyEntity } from '../../../domain/entities/currency.entity';
import { currencyClient } from '../../../libs/core-client';
import { ICoreCurrency } from './core-currency.interface';
import { CurrencyMapper } from '../mappers/currency.mapper';

export class CoreCurrencyAdapter implements GetCoreCurrencyPort {
	private mapper: CurrencyMapper;

	constructor() {
		this.mapper = new CurrencyMapper();
	}

	async getCurrency(apiKey: string, symbol: string): Promise<CurrencyEntity> {
		const result: ICoreCurrency = await currencyClient.getCurrency(apiKey, symbol);
		return this.mapper.coreToDomain(result);
	}
}

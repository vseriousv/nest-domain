import { CurrencyEntity } from '../../entities/currency.entity';

export interface GetCoreCurrencyPort {
	getCurrency(apiKey: string, symbol: string): Promise<CurrencyEntity>;
}

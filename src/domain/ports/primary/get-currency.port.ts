import { CurrencyEntity } from '../../entities/currency.entity';

export interface GetCurrencyPort {
	getCurrency(apiKey: string, symbol: string): Promise<CurrencyEntity>;
}

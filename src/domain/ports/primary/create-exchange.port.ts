import { ExchangeEntity } from '../../entities/exchange.entity';

export interface CreateExchangePort {
	createExchange(
		apiKey: string,
		referral: string,
		fixed: boolean,
		currencyFrom: string,
		currencyTo: string,
		addressTo: string,
		amount: number,
		extraIdTo: string,
	):Promise<ExchangeEntity>;
	validateApiKey(apiKey: string, apiKeyDefault: string): string;
	validateReferral(referral: string): string;
	validateFixed(fixed: boolean):boolean;
}

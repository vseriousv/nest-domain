import { ExchangeEntity } from '../../entities/exchange.entity';

export interface CreateCoreExchangePort {
	createExchange(
		apikey: string,
		referral: string,
		fixed: boolean,
		currencyFrom: string,
		currencyTo: string,
		addressTo: string,
		amount: string,
		extraIdTo: string,
	): Promise<ExchangeEntity>
}

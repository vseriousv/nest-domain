import { ExchangeEntity } from '../../entities/exchange.entity';

export interface SaveExchangePort {
	saveExchange(saveData: ExchangeEntity): Promise<ExchangeEntity>;
}

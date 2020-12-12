import { GetCurrencyPort } from '../ports/primary/get-currency.port';
import { GetCoreCurrencyPort } from '../ports/secondary/get-core-currency.port';
import { CurrencyEntity } from '../entities/currency.entity';

export class GetCurrencyUseCase implements GetCurrencyPort {
	constructor(private readonly _port: GetCoreCurrencyPort) {
	}

	async getCurrency(apiKey: string, symbol: string): Promise<CurrencyEntity> {
		return await this._port.getCurrency(apiKey, symbol);
	}

}

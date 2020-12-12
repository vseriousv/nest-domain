import { CreateExchangePort } from '../ports/primary/create-exchange.port';
import { ExchangeEntity } from '../entities/exchange.entity';
import { SaveExchangePort } from '../ports/secondary/save-exchange.port';
import { CreateCoreExchangePort } from '../ports/secondary/create-core-exchange.port';

export class CreateAndSaveExchangeUseCase implements CreateExchangePort {
	constructor(
		private readonly _provider: CreateCoreExchangePort,
		private readonly _dataBase: SaveExchangePort,
	) {
	}

	async createExchange(
		apiKey: string,
		referral: string,
		fixed: boolean,
		currencyFrom: string,
		currencyTo: string,
		addressTo: string,
		amount: number,
		extraIdTo: string,
	): Promise<ExchangeEntity> {
		const exchange: ExchangeEntity =
			await this._provider.createExchange(apiKey, referral, fixed, currencyFrom, currencyTo, addressTo, amount.toString(), extraIdTo);
		return await this._dataBase.saveExchange(exchange);
	}

	validateApiKey(apiKey: string, apiKeyDefault: string): string {
		return apiKey || apiKeyDefault;
	}

	validateReferral(referral: string): string {
		return referral || '';
	}

	validateFixed(fixed: boolean): boolean {
		return fixed || false;
	}

}

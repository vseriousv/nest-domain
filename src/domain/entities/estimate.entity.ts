import { MoneyEntity } from './money.entity';
import { CurrencyEntity } from './currency.entity';

export class EstimateEntity {

	constructor(
		private readonly _amount: MoneyEntity,
		private readonly _currencyFrom: string,
		private readonly _currencyTo: string,
		private readonly _estimated: MoneyEntity,
		private readonly _rate?: number,
	) {
	}

	get amount(): MoneyEntity {
		return this._amount;
	}

	get currencyFrom(): string {
		return this._currencyFrom;
	}

	get currencyTo(): string {
		return this._currencyTo;
	}

	get rate(): number {
		return this._rate;
	}

	get estimated(): MoneyEntity {
		return this._estimated;
	}

	static calculate(
		amount: MoneyEntity,
		currencyFrom: string,
		currencyTo: string,
		rate: number,
	): EstimateEntity {
		return new EstimateEntity(
			amount,
			currencyFrom,
			currencyTo,
			MoneyEntity.multiple(amount, rate),
			rate,
		);
	}
}

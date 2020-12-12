import { BigNumber } from 'bignumber.js';

export class MoneyEntity {
	constructor(
		private readonly _amount: BigNumber,
	) {
	}

	static ZERO() {
		return new MoneyEntity(new BigNumber(0));
	}

	static of(value: number) {
		return new MoneyEntity(new BigNumber(value));
	}

	static toNumber(value: BigNumber): number {
		return value.toNumber();
	}

	get amount(): BigNumber {
		return this._amount;
	}

	static add(a: MoneyEntity, b: MoneyEntity): MoneyEntity {
		return new MoneyEntity(a.amount.plus(b.amount));
	}

	negate() {
		return new MoneyEntity(this.amount.negated());
	}

	isPositiveOrZero() {
		return this.amount.comparedTo(0) >= 0;
	}

	static minus(a: MoneyEntity, b: MoneyEntity): MoneyEntity {
		return new MoneyEntity(a.amount.minus(b.amount));
	}

	static multiple(a: MoneyEntity, b: number): MoneyEntity {
		return new MoneyEntity(a.amount.multipliedBy(b));
	}
}

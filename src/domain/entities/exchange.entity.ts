import { CurrencyEntity } from './currency.entity';
import { MoneyEntity } from './money.entity';
import { TExchangeId, TExchangeTypes } from '../types/exchange.types';

export class ExchangeEntity {

	constructor(
		private readonly _type: TExchangeTypes,
		private readonly _timestamp: Date,
		private readonly _updatedAt: Date,
		private readonly _currencyFrom: CurrencyEntity,
		private readonly _currencyTo: CurrencyEntity,
		private readonly _amountFrom: MoneyEntity,
		private readonly _amountTo: MoneyEntity,
		private readonly _addressFrom: string,
		private readonly _addressTo: string,
		private readonly _extraIdFrom: string,
		private readonly _extraIdTo: string,
		private readonly _userRefundAddress: string | null,
		private readonly _userRefundExtraId: string | null,
		private readonly _txFrom: string,
		private readonly _txTo: string,
		private readonly _status: string,
		private readonly _objectId?: TExchangeId,
		private readonly _partnerProfit?: MoneyEntity,
		private readonly _partnerProfitBtc?: MoneyEntity,
		private readonly _partnerProfitAmount?: MoneyEntity,
		private readonly _amountToBtc?: MoneyEntity,
		private readonly _amountFromBtc?: MoneyEntity,
		private readonly _partnerPaidOut?: boolean,
		private readonly _id?: number,
		private readonly _apiKeyId?: number,
		private readonly _refKeyId?: number,
	) {
	}

	get currencyFrom(): CurrencyEntity {
		return this._currencyFrom;
	}

	get currencyTo(): CurrencyEntity {
		return this._currencyTo;
	}

	get type(): TExchangeTypes {
		return this._type;
	}

	get timestamp(): Date {
		return this._timestamp;
	}

	get updatedAt(): Date {
		return this._updatedAt;
	}

	get amountFrom(): MoneyEntity {
		return this._amountFrom;
	}

	get amountTo(): MoneyEntity {
		return this._amountTo;
	}

	get addressFrom(): string {
		return this._addressFrom;
	}

	get addressTo(): string {
		return this._addressTo;
	}

	get extraIdFrom(): string {
		return this._extraIdFrom;
	}

	get extraIdTo(): string {
		return this._extraIdTo;
	}

	get userRefundAddress(): string | null {
		return this._userRefundAddress;
	}

	get userRefundExtraId(): string | null {
		return this._userRefundExtraId;
	}

	get txFrom(): string {
		return this._txFrom;
	}

	get txTo(): string {
		return this._txTo;
	}

	get status(): string {
		return this._status;
	}

	get id(): number {
		return this._id;
	}

	get objectId(): TExchangeId {
		return this._objectId;
	}

	get partnerProfit(): MoneyEntity {
		return this._partnerProfit;
	}

	get partnerProfitBtc(): MoneyEntity {
		return this._partnerProfitBtc;
	}

	get partnerProfitAmount(): MoneyEntity {
		return this._partnerProfitAmount;
	}

	get amountToBtc(): MoneyEntity {
		return this._amountToBtc;
	}

	get amountFromBtc(): MoneyEntity {
		return this._amountFromBtc;
	}

	get partnerPaidOut(): boolean {
		return this._partnerPaidOut;
	}

	get apiKeyId(): number {
		return this._apiKeyId;
	}

	get refKeyId(): number {
		return this._refKeyId;
	}
}

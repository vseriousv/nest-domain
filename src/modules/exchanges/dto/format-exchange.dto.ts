import { ExchangeType } from '../interfaces/exchange.type';
import { ApiProperty } from '@nestjs/swagger';

export class FormatExchangeDto {
	readonly objectId: string;
	readonly type: string;
	readonly currencyFrom: string;
	readonly currencyTo: string;
	readonly addressFrom: string;
	readonly addressTo: string;
	readonly extraIdFrom: string;
	readonly extraIdTo: string;
	readonly userRefundAddress: string;
	readonly userRefundExtraId: string;
	readonly amountFrom: string;
	readonly amountTo: string;
	readonly txFrom: string;
	readonly txTo: string;
	readonly status: string;
	readonly apiKeyId: number;
	readonly refKeyId: number;
	readonly timestamp: Date;
	readonly updateDate: Date;
	readonly partnerProfit: string;
	readonly partnerProfitBtc: string;
	readonly partnerProfitAmount: string;
	readonly amountToBtc: string;
	readonly amountFromBtc: string;
	readonly partnerPaidOut: boolean;

	constructor(data: ExchangeType, apiKeyId, refKeyId) {
		this.objectId = data.id;
		this.type = data.type;
		this.currencyFrom = data.currency_from;
		this.currencyTo = data.currency_to;
		this.addressFrom = data.address_from;
		this.addressTo = data.address_to;
		this.extraIdFrom = data.extra_id_from;
		this.extraIdTo = data.extra_id_to;
		this.userRefundAddress = data.user_refund_address;
		this.userRefundExtraId = data.user_refund_extra_id;
		this.amountFrom = data.amount_from;
		this.amountTo = data.amount_to;
		this.txFrom = data.tx_from;
		this.txTo = data.tx_to;
		this.status = data.status;
		this.apiKeyId = apiKeyId;
		this.refKeyId = refKeyId;
		this.timestamp = new Date(data.timestamp);
		this.updateDate = new Date(data.updated_at);
		this.partnerProfit = data.partner_profit;
		this.partnerProfitBtc = data.partner_profit_btc;
		this.partnerProfitAmount = data.partner_profit_amount;
		this.amountToBtc = data.amount_to_btc;
		this.amountFromBtc = data.amount_from_btc;
		this.partnerPaidOut = data.partner_paid_out;
	}
}

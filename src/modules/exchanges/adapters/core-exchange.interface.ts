export interface ICoreExchange {
	id: string;
	type: string;
	timestamp: string;
	updated_at: string;
	currency_from: string;
	currency_to: string;
	amount_from: string;
	amount_to: string;
	address_from: string;
	address_to: string;
	extra_id_from: string;
	extra_id_to: string;
	user_refund_address: string;
	user_refund_extra_id: string;
	status: string;
	tx_from: string;
	tx_to: string;
	partner_profit: string;
	partner_profit_btc: string;
	partner_profit_amount: string;
	amount_to_btc: string;
	amount_from_btc: string;
	partner_paid_out: boolean;
	currencies: object
}

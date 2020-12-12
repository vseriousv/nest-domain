import { Column, CreatedAt, Model, Table, UpdatedAt } from 'sequelize-typescript';

@Table({
	tableName: 'exchanges',
})
export class ExchangeOrmEntity extends Model<ExchangeOrmEntity> {
	@Column({
		autoIncrement: true,
		primaryKey: true,
	})
	id: number;

	@Column({ field: 'object_id' })
	objectId: string;

	@Column
	type: string;

	@Column({ field: 'currency_from' })
	currencyFrom: string;

	@Column({ field: 'currency_to' })
	currencyTo: string;

	@Column({ field: 'address_from' })
	addressFrom: string;

	@Column({ field: 'address_to' })
	addressTo: string;

	@Column({ field: 'extra_id_from' })
	extraIdFrom: string;

	@Column({ field: 'extra_id_to' })
	extraIdTo: string;

	@Column({ field: 'user_refund_address' })
	userRefundAddress: string;

	@Column({ field: 'user_refund_extra_id' })
	userRefundExtraId: string;

	@Column({ field: 'amount_from' })
	amountFrom: number;

	@Column({ field: 'amount_to' })
	amountTo: number;

	@Column({ field: 'tx_from' })
	txFrom: string;

	@Column({ field: 'tx_to' })
	txTo: string;

	@Column
	status: string;

	@Column
	timestamp: Date;

	@Column({ field: 'update' })
	updateDate: Date;

	@CreatedAt
	@Column({ field: 'created_at' })
	createdAt: Date;

	@UpdatedAt
	@Column({ field: 'updated_at' })
	updatedAt: Date;

	@Column({ field: 'partner_profit' })
	partnerProfit: number;

	@Column({ field: 'partner_profit_btc' })
	partnerProfitBtc: number;

	@Column({ field: 'partner_profit_amount' })
	partnerProfitAmount: number;

	@Column({ field: 'amount_to_btc' })
	amountToBtc: number;

	@Column({ field: 'amount_from_btc' })
	amountFromBtc: number;

	@Column({ field: 'partner_paid_out' })
	partnerPaidOut: boolean;

	@Column
	apiKeyId: number;

	@Column
	refKeyId: number;

}

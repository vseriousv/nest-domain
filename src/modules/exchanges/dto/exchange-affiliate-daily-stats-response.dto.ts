import { ApiProperty } from '@nestjs/swagger';

export type TAmount = {
	btc: number;
	usd: number;
};

export class ExchangeAffiliateDailyStatsResponseDto {
	@ApiProperty()
	readonly createdAt: Date;

	@ApiProperty()
	readonly count: number;

	@ApiProperty()
	readonly finished: number;

	@ApiProperty()
	readonly failed: number;

	@ApiProperty()
	readonly amount: TAmount;

	@ApiProperty()
	readonly partnerProfit: TAmount;

	constructor(
		createdAt: Date,
		count: number,
		finished: number,
		failed: number,
		amountToBtc: number,
		partnerProfitBtc: number,
		amountToUsd: number,
		partnerProfitUsd: number,
	) {
		this.createdAt = createdAt;
		this.count = Number(count);
		this.finished = Number(finished);
		this.failed = Number(failed);
		this.amount = { btc: Number(amountToBtc), usd: Number(amountToUsd)};
		this.partnerProfit = { btc: Number(partnerProfitBtc), usd: Number(partnerProfitUsd)};
	}
}

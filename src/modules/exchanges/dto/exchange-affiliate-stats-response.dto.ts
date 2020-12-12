import { ApiProperty } from '@nestjs/swagger';

export class ExchangeAffiliateStatsResponseDto {
	@ApiProperty()
	readonly totalTurnover: number;
	@ApiProperty()
	readonly estimatedBalance: number;
	@ApiProperty()
	readonly readyToPayout: number;
	@ApiProperty()
	readonly transactionsCount: number;
	@ApiProperty()
	readonly affiliateFee: number;

	constructor(
		totalTurnover: number,
		estimatedBalance: number,
		readyToPayout: number,
		transactionsCount: number,
		affiliateFee: number,
	) {
		this.totalTurnover = Number(totalTurnover);
		this.estimatedBalance = Number(estimatedBalance);
		this.readyToPayout = Number(readyToPayout);
		this.transactionsCount = transactionsCount;
		this.affiliateFee = affiliateFee;
	}
}

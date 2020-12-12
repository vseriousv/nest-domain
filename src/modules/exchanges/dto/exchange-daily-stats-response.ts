import { ApiProperty } from '@nestjs/swagger';
import { ExchangeAffiliateDailyStatsResponseDto } from './exchange-affiliate-daily-stats-response.dto';

export class ExchangeDailyStatsResponse {

	@ApiProperty()
	readonly startDate: Date | string;

	@ApiProperty()
	readonly finishDate: Date | string;

	@ApiProperty()
	readonly countAll: number;

	@ApiProperty()
	readonly countRows: number;

	@ApiProperty()
	readonly countPages: number;

	@ApiProperty()
	readonly page: number;

	@ApiProperty({ type: ExchangeAffiliateDailyStatsResponseDto, isArray: true })
	rows: ExchangeAffiliateDailyStatsResponseDto[];
}

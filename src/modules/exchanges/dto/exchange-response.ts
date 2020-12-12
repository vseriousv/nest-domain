import { ApiProperty } from '@nestjs/swagger';
import { ExchangeDto } from './exchange.dto';

export class ExchangeResponse {

	@ApiProperty()
	readonly statuses: string[];

	@ApiProperty()
	readonly tickersFrom: string[];

	@ApiProperty()
	readonly tickersTo: string[];

	@ApiProperty()
	readonly sources: string[];

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

	@ApiProperty({ type: ExchangeDto, isArray: true })
	rows: ExchangeDto[];
}

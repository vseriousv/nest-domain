import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExchangeDto {
	@ApiProperty()
	@IsOptional()
	readonly apiKey: string;

	@ApiProperty()
	@IsOptional()
	readonly referral: string;

	@ApiProperty({
		description: 'Pass true for create fixed-rate exchange',
		default: false,
		required: false
	})
	@IsOptional()
	readonly fixed: boolean;

	@ApiProperty({
		description: 'Sender currency symbol'
	})
	readonly currencyFrom: string;

	@ApiProperty({
		description: 'Recipient currency symbol'
	})
	readonly currencyTo: string;

	@ApiProperty({
		description: 'Address of the recipient'
	})
	readonly addressTo: string;

	@ApiProperty({
		description: 'Amount of currency to exchange'
	})
	readonly amount: number;

	@ApiProperty({
		description: 'Additional recipient identifier (if any)',
		required: false
	})
	@IsOptional()
	readonly extraIdTo: string;
}

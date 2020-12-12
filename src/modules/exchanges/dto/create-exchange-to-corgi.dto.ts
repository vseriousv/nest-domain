import { ApiProperty } from '@nestjs/swagger';
import { CurrencyDto } from '../../currencies/dto/currency.dto';
import { IsOptional } from 'class-validator';

export class CreateExchangeToCorgiDto {

  @ApiProperty({
    description: 'Pass true for create fixed-rate exchange',
    default: false,
    required: false
  })
  @IsOptional()
  fixed: boolean;

  @ApiProperty({
    description: 'Sender currency symbol'
  })
  currencyFrom: string;

  @ApiProperty({
    description: 'Recipient currency symbol'
  })
  currencyTo: string;

  @ApiProperty({
    description: 'Address of the recipient'
  })
  addressTo: string;

  @ApiProperty({
    description: 'Amount of currency to exchange'
  })
  amount: number;

  @ApiProperty({
    description: 'Additional recipient identifier (if any)',
    required: false
  })
  @IsOptional()
  extraIdTo: string;
}

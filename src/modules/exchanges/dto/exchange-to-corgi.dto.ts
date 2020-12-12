import { ApiProperty } from '@nestjs/swagger';
import { CurrencyDto } from '../../currencies/dto/currency.dto';

export class ExchangeToCorgiDto {

  @ApiProperty()
  id: string;

  @ApiProperty()
  type: string;

  @ApiProperty({
    type: 'Date',
    description: 'Timestamp - Date format'
  })
  timestamp: string;

  @ApiProperty({
    type: 'Date',
    description: 'Update date, return format by date'
  })
  updatedAt: string;

  @ApiProperty({
    description: 'The coin you are sending'
  })
  currencyFrom: string;

  @ApiProperty({
    description: 'The coin you get'
  })
  currencyTo: string;

  @ApiProperty({
    description: 'Number of coins sent'
  })
  amountFrom: string;

  @ApiProperty({
    description: 'Number of coins received'
  })
  amountTo: string;

  @ApiProperty({
    description: 'Departure address'
  })
  addressFrom: string;

  @ApiProperty({
    description: 'Receiving address'
  })
  addressTo: string;

  @ApiProperty({
    description: 'Additional sender identifier'
  })
  extraIdFrom: string;

  @ApiProperty({
    description: 'Additional recipient identifier'
  })
  extraIdTo: string;

  @ApiProperty({
    description: 'User return address'
  })
  userRefundAddress: string;

  @ApiProperty({
    description: 'Additional user identifier'
  })
  userRefundExtraId: string;

  @ApiProperty({
    description: 'Send transaction hash'
  })
  txFrom: string;

  @ApiProperty({
    description: 'Receive transaction hash'
  })
  txTo: string;

  @ApiProperty({
    description: 'Exchange status'
  })
  status: string;

  @ApiProperty({
    description: 'Exchange coins'
  })
  currencies: CurrencyDto;
}

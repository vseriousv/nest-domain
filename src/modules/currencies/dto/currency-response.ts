import { ApiProperty } from '@nestjs/swagger';
import { CurrencyDto } from './currency.dto';

export class CurrencyResponse {
  @ApiProperty({type: CurrencyDto, isArray: true})
  rows: CurrencyDto[];

  @ApiProperty()
  readonly  count: number;
}
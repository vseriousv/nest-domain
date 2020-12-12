import { ApiProperty } from '@nestjs/swagger';
import { ExchangeToCorgiDto } from './exchange-to-corgi.dto';

export class ExchangesResponse {
  @ApiProperty()
  readonly status: string;

  @ApiProperty()
  readonly  statusCode: number;

  @ApiProperty()
  readonly  count: number;

  @ApiProperty({type: ExchangeToCorgiDto, isArray: true})
  result: ExchangeToCorgiDto[];
}

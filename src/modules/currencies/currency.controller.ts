import { Body, Controller, Get, Query } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrencyDto } from './dto/currency.dto';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';

@Controller('currencies')
@ApiTags('Currencies')
export class CurrencyController {
	constructor(private readonly service: CurrencyService) {
	}

	@Get('/corgi')
	@ApiOperation({
		summary: 'Getting currency by symbol',
	})
	@ApiImplicitQuery({ name: 'api_keys', type: String, required: true })
	@ApiImplicitQuery({ name: 'symbol', type: String, required: true })
	async getCurrency(
		@Query('api_keys') apiKeysStr: string,
		@Query('symbol') symbolStr: string,
	): Promise<CurrencyDto> {
		const apiKeys = apiKeysStr.trim().toLowerCase();
		const symbol = symbolStr.trim().toLowerCase();
		return this.service.getCurrencyFormCorgi(apiKeys, symbol);
	}
}

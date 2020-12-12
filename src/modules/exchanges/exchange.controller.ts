import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ExchangeService } from './services/exchange.service';
import { ExchangeDto } from './dto/exchange.dto';
import { CreateExchangeDto } from './dto/create-exchange.dto';

@Controller('exchanges')
@ApiTags('Exchanges')
export class ExchangeController {
	constructor(private readonly service: ExchangeService) {
	}

	@Post()
	@ApiOperation({ summary: 'Create exchange' })
	@ApiOkResponse({ type: ExchangeDto })
	async create(@Body() data: CreateExchangeDto): Promise<ExchangeDto> {
		return await this.service.createExchange(data);
	}
}

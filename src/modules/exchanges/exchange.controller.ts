import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';
import { ExchangesResponse } from './dto/exchanges-response';
import { ExchangeResponse } from './dto/exchange-response';
import { ExchangeAffiliateStatsResponseDto } from './dto/exchange-affiliate-stats-response.dto';
import { StatusesExchange } from '../../shared/enum/statusesExchange';
import { ExchangeAffiliateDailyStatsResponseDto } from './dto/exchange-affiliate-daily-stats-response.dto';
import { ExchangeDailyStatsResponse } from './dto/exchange-daily-stats-response';
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

	@Get('/affiliate-stats')
	@ApiOperation({
		summary: 'Getting statistics on exchanges',
	})
	@ApiImplicitQuery({ name: 'api_keys', type: String, required: true })
	@ApiImplicitQuery({ name: 'ref_keys', type: String, required: true })
	@ApiOkResponse({ type: ExchangeAffiliateStatsResponseDto })
	getAffiliateStats(
		@Query('api_keys') apiKeysStr: string,
		@Query('ref_keys') refKeysStr: string,
	): Promise<ExchangeAffiliateStatsResponseDto> {
		const apiKeys = JSON.parse(apiKeysStr);
		const refKeys = JSON.parse(refKeysStr);
		return this.service.getAffiliateStats(apiKeys, refKeys);
	}

	@Get('/affiliate-daily-stats')
	@ApiOperation({
		summary: 'Getting statistics on exchanges',
	})
	@ApiImplicitQuery({ name: 'api_keys', type: String, required: true })
	@ApiImplicitQuery({ name: 'ref_keys', type: String, required: true })
	@ApiImplicitQuery({ name: 'limit', type: String, required: false })
	@ApiImplicitQuery({ name: 'page', type: String, required: false })
	@ApiImplicitQuery({ name: 'startDate', type: String, required: false })
	@ApiImplicitQuery({ name: 'finishDate', type: String, required: false })
	@ApiOkResponse({ type: ExchangeAffiliateDailyStatsResponseDto, isArray: true })
	getAffiliateDailyStats(
		@Query('api_keys') apiKeysStr: string,
		@Query('ref_keys') refKeysStr: string,
		@Query('limit') limitStr?: string,
		@Query('page') pageStr?: string,
		@Query('startDate') startDateStr?: string,
		@Query('finishDate') finishDateStr?: string,
	): Promise<ExchangeDailyStatsResponse> {
		const apiKeys = JSON.parse(apiKeysStr);
		const refKeys = JSON.parse(refKeysStr);
		const limit = parseInt(limitStr, 10) || 10;
		const page = parseInt(pageStr, 10) || 1;
		const startDate = startDateStr || undefined;
		const finishDate = finishDateStr || undefined;
		return this.service.getAffiliateDailyStats(apiKeys, refKeys, limit, page, startDate, finishDate);
	}

	@Get('/affiliate-history')
	@ApiOperation({
		summary: 'Getting exchanges for affiliates history',
	})
	@ApiImplicitQuery({ name: 'api_keys', type: String, required: true })
	@ApiImplicitQuery({ name: 'ref_keys', type: String, required: true })
	@ApiImplicitQuery({ name: 'limit', type: String, required: false })
	@ApiImplicitQuery({ name: 'page', type: String, required: false })
	@ApiImplicitQuery({ name: 'status', type: String, required: false })
	@ApiImplicitQuery({ name: 'currencyFrom', type: String, required: false })
	@ApiImplicitQuery({ name: 'currencyTo', type: String, required: false })
	@ApiImplicitQuery({ name: 'startDate', type: String, required: false })
	@ApiImplicitQuery({ name: 'finishDate', type: String, required: false })
	@ApiOkResponse({ type: ExchangesResponse })
	getAffiliateHistory(
		@Query('api_keys') apiKeysStr: string,
		@Query('ref_keys') refKeysStr: string,
		@Query('limit') limitStr?: string,
		@Query('page') pageStr?: string,
		@Query('status') statusStr?: StatusesExchange,
		@Query('currencyFrom') currencyFromStr?: string,
		@Query('currencyTo') currencyToStr?: string,
		@Query('startDate') startDateStr?: string,
		@Query('finishDate') finishDateStr?: string,
	): Promise<ExchangeResponse> {
		const apiKeys = JSON.parse(apiKeysStr);
		const refKeys = JSON.parse(refKeysStr);
		const limit = parseInt(limitStr, 10) || 10;
		const page = parseInt(pageStr, 10) || 1;
		const status = statusStr || StatusesExchange.all;
		const currencyFrom = currencyFromStr || undefined;
		const currencyTo = currencyToStr || undefined;
		const startDate = startDateStr || undefined;
		const finishDate = finishDateStr || undefined;
		return this.service.getAffiliateHistory(apiKeys, refKeys, limit, page, status, currencyFrom, currencyTo, startDate, finishDate);
	}
}

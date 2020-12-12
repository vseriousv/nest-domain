import { Injectable } from '@nestjs/common';
import { GetCurrencyUseCase } from '../../domain/use-cases/get-currency.use.case';
import { GetCoreCurrencyPort } from '../../domain/ports/secondary/get-core-currency.port';
import { CoreCurrencyAdapter } from './adapters/core-currency.adapter';
import { CurrencyDto } from './dto/currency.dto';
import { CurrencyMapper } from './mappers/currency.mapper';

@Injectable()
export class CurrencyService {
	private readonly _port: GetCoreCurrencyPort;
	private readonly _getCurrencyUseCase: GetCurrencyUseCase;
	private readonly _mapper: CurrencyMapper;

	constructor() {
		this._mapper = new CurrencyMapper();
		this._port = new CoreCurrencyAdapter();
		this._getCurrencyUseCase = new GetCurrencyUseCase(this._port);
	}

	async getCurrencyFormCorgi(apiKey: string, symbol: string): Promise<CurrencyDto> {
		const dto = await this._getCurrencyUseCase.getCurrency(apiKey, symbol)
		return this._mapper.domainToDto(dto);
	}
}

import { SaveExchangePort } from '../../../domain/ports/secondary/save-exchange.port';
import { ExchangeEntity } from '../../../domain/entities/exchange.entity';
import { Inject, Injectable } from '@nestjs/common';
import { ExchangeOrmEntity } from '../entities/exchange.orm-entity';
import { ExchangeMapper } from '../mappers/exchange.mapper';

export class PostgresAdapter implements SaveExchangePort {
	private readonly _mapper: ExchangeMapper;

	constructor() {
		this._mapper = new ExchangeMapper();
	}

	async saveExchange(saveData: ExchangeEntity): Promise<ExchangeEntity> {
		const result = await this._mapper.domainToOrm(saveData).save();
		return this._mapper.ormToDomain(result, saveData.currencyFrom, saveData.currencyTo);
	}

}

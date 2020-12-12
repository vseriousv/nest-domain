import { ExchangeType } from '../interfaces/exchange.type';
import { ExchangeOrmEntity } from '../entities/exchange.orm-entity';
import { ApiProperty } from '@nestjs/swagger';
import { ApiKeyDto } from '../../api-keys/dto/api-key.dto';
import { RefKeyDto } from '../../ref-keys/dto/ref-key.dto';
import { Column } from 'sequelize-typescript';
import { CurrencyEntity } from '../../currencies/enitities/currency.entity';
import { CurrencyType } from '../../currencies/intefaces/currency.type';
import { ExchangeEntity } from '../../../domain/entities/exchange.entity';

export class ExchangeDto {
	@ApiProperty()
	readonly id: number;

	@ApiProperty()
	readonly objectId: string;

	@ApiProperty()
	readonly type: string;

	@ApiProperty()
	readonly currencyFrom: string;

	@ApiProperty()
	readonly currencyTo: string;

	@ApiProperty()
	readonly addressFrom: string;

	@ApiProperty()
	readonly addressTo: string;

	@ApiProperty()
	readonly extraIdFrom: string;

	@ApiProperty()
	readonly extraIdTo: string;

	@ApiProperty()
	readonly userRefundAddress: string;

	@ApiProperty()
	readonly userRefundExtraId: string;

	@ApiProperty()
	readonly amountFrom: number;

	@ApiProperty()
	readonly amountTo: number;

	@ApiProperty()
	readonly txFrom: string;

	@ApiProperty()
	readonly txTo: string;

	@ApiProperty()
	readonly status: string;

	@ApiProperty()
	readonly createdAt: Date;

	@ApiProperty()
	readonly apiKeyId: number;

	@ApiProperty()
	readonly refKeyId: number;

	// @ApiProperty()
	// readonly apiKey: ApiKeyDto;
	//
	// @ApiProperty()
	// readonly refKey: RefKeyDto;

	@ApiProperty()
	readonly partnerProfit: number;

	@ApiProperty()
	readonly partnerProfitBtc: number;

	@ApiProperty()
	readonly partnerProfitAmount: number;

	@ApiProperty()
	readonly amountToBtc: number;

	@ApiProperty()
	readonly amountFromBtc: number;

	@ApiProperty()
	readonly partnerPaidOut: boolean;

	constructor(
		id: number,
		objectId: string,
		type: string,
		currencyTo: string,
		currencyFrom: string,
		addressFrom: string,
		addressTo: string,
		extraIdFrom: string,
		extraIdTo: string,
		userRefundAddress: string,
		userRefundExtraId: string,
		amountFrom: number,
		amountTo: number,
		txFrom: string,
		txTo: string,
		status: string,
		apiKeyId: number,
		refKeyId: number,
		timestamp: Date,
		// apiKey: ApiKeyDto,
		// refKey: RefKeyDto,
		partnerProfit?: number,
		partnerProfitBtc?: number,
		partnerProfitAmount?: number,
		amountToBtc?: number,
		amountFromBtc?: number,
		partnerPaidOut?: boolean,
	) {
		this.id = id;
		this.objectId = objectId;
		this.type = type;
		this.currencyFrom = currencyFrom;
		this.currencyTo = currencyTo;
		this.addressFrom = addressFrom;
		this.addressTo = addressTo;
		this.extraIdFrom = extraIdFrom;
		this.extraIdTo = extraIdTo;
		this.userRefundAddress = userRefundAddress;
		this.userRefundExtraId = userRefundExtraId;
		this.amountFrom = amountFrom;
		this.amountTo = amountTo;
		this.txFrom = txFrom;
		this.txTo = txTo;
		this.status = status;
		this.apiKeyId = apiKeyId;
		this.refKeyId = refKeyId;
		this.createdAt = timestamp;
		// this.apiKey = apiKey;
		// this.refKey = refKey;
		this.partnerProfit = partnerProfit || null;
		this.partnerProfitBtc = partnerProfitBtc || null;
		this.partnerProfitAmount = partnerProfitAmount || null;
		this.amountToBtc = amountToBtc || null;
		this.amountFromBtc = amountFromBtc || null;
		this.partnerPaidOut = partnerPaidOut || null;
	}
}

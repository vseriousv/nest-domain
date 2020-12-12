import { ExchangeEntity } from '../../../domain/entities/exchange.entity';
import { ExchangeDto } from '../dto/exchange.dto';
import { MoneyEntity } from '../../../domain/entities/money.entity';
import { ExchangeOrmEntity } from '../entities/exchange.orm-entity';
import { ICoreExchange } from '../adapters/core-exchange.interface';
import { TExchangeTypes } from '../../../domain/types/exchange.types';
import { CurrencyEntity } from '../../../domain/entities/currency.entity';

export class ExchangeMapper {

	coreToDomain(core: ICoreExchange, coreCurrencyFrom: CurrencyEntity, coreCurrencyTo: CurrencyEntity): ExchangeEntity {
		const type = core.type === 'fixed' ? TExchangeTypes.fixed : TExchangeTypes.floating;

		return new ExchangeEntity(
			type,
			new Date(core.timestamp),
			new Date(core.updated_at),
			coreCurrencyFrom,
			coreCurrencyTo,
			MoneyEntity.of(Number(core.amount_from)),
			MoneyEntity.of(Number(core.amount_to)),
			core.address_from,
			core.address_to,
			core.extra_id_from,
			core.extra_id_to,
			core.user_refund_address,
			core.user_refund_extra_id,
			core.tx_from,
			core.tx_to,
			core.status,
			core.id,
			MoneyEntity.of(Number(core.partner_profit)),
			MoneyEntity.of(Number(core.partner_profit_btc)),
			MoneyEntity.of(Number(core.partner_profit_amount)),
			MoneyEntity.of(Number(core.amount_to_btc)),
			MoneyEntity.of(Number(core.amount_from_btc)),
			core.partner_paid_out,
		);
	}

	domainToDto(entity: ExchangeEntity): ExchangeDto {
		return new ExchangeDto(
			entity.id,
			entity.objectId,
			entity.type,
			entity.currencyTo.symbol,
			entity.currencyFrom.symbol,
			entity.addressFrom,
			entity.addressTo,
			entity.extraIdFrom,
			entity.extraIdTo,
			entity.userRefundAddress,
			entity.userRefundExtraId,
			MoneyEntity.toNumber(entity.amountFrom.amount),
			MoneyEntity.toNumber(entity.amountTo.amount),
			entity.txFrom,
			entity.txTo,
			entity.status,
			entity.apiKeyId,
			entity.refKeyId,
			entity.timestamp,
		);
	}

	ormToDto(entity: ExchangeOrmEntity): ExchangeDto {
		return new ExchangeDto(
			entity.id,
			entity.objectId,
			entity.type,
			entity.currencyTo,
			entity.currencyFrom,
			entity.addressFrom,
			entity.addressTo,
			entity.extraIdFrom,
			entity.extraIdTo,
			entity.userRefundAddress,
			entity.userRefundExtraId,
			entity.amountFrom,
			entity.amountTo,
			entity.txFrom,
			entity.txTo,
			entity.status,
			entity.apiKeyId,
			entity.refKeyId,
			entity.timestamp,
		);
	}

	domainToOrm(entity: ExchangeEntity): ExchangeOrmEntity {
		const ormEntity = new ExchangeOrmEntity();
		ormEntity.objectId = entity.objectId;
		ormEntity.type = entity.type;
		ormEntity.currencyFrom = entity.currencyFrom.symbol;
		ormEntity.currencyTo = entity.currencyTo.symbol;
		ormEntity.addressFrom = entity.addressFrom;
		ormEntity.addressTo = entity.addressTo;
		ormEntity.extraIdFrom = entity.extraIdFrom;
		ormEntity.extraIdTo = entity.extraIdTo;
		ormEntity.userRefundAddress = entity.userRefundAddress;
		ormEntity.userRefundExtraId = entity.userRefundExtraId;
		ormEntity.amountFrom = MoneyEntity.toNumber(entity.amountFrom.amount);
		ormEntity.amountTo = MoneyEntity.toNumber(entity.amountTo.amount);
		ormEntity.txFrom = entity.txFrom;
		ormEntity.txTo = entity.txTo;
		ormEntity.status = entity.status;
		ormEntity.timestamp = entity.timestamp;
		ormEntity.updateDate = entity.updatedAt;
		return ormEntity;
	}

	ormToDomain(ormEntity: ExchangeOrmEntity, coreCurrencyFrom: CurrencyEntity, coreCurrencyTo: CurrencyEntity): ExchangeEntity {
		const type = ormEntity.type === 'fixed' ? TExchangeTypes.fixed : TExchangeTypes.floating;
		return new ExchangeEntity(
			type,
			ormEntity.timestamp,
			ormEntity.updateDate,
			coreCurrencyFrom,
			coreCurrencyTo,
			MoneyEntity.of(ormEntity.amountFrom),
			MoneyEntity.of(ormEntity.amountTo),
			ormEntity.addressFrom,
			ormEntity.addressTo,
			ormEntity.extraIdFrom,
			ormEntity.extraIdTo,
			ormEntity.userRefundAddress,
			ormEntity.userRefundExtraId,
			ormEntity.txFrom,
			ormEntity.txTo,
			ormEntity.status,
			ormEntity.objectId,
			MoneyEntity.of(ormEntity.partnerProfit),
			MoneyEntity.of(ormEntity.partnerProfitBtc),
			MoneyEntity.of(ormEntity.partnerProfitAmount),
			MoneyEntity.of(ormEntity.amountToBtc),
			MoneyEntity.of(ormEntity.amountFromBtc),
			ormEntity.partnerPaidOut,
		);
	}
}

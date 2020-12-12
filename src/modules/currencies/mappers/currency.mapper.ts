import { ICoreCurrency } from '../adapters/core-currency.interface';
import { CurrencyEntity } from '../../../domain/entities/currency.entity';
import { CurrencyDto } from '../dto/currency.dto';

export class CurrencyMapper {
	coreToDomain(core: ICoreCurrency): CurrencyEntity {
		return new CurrencyEntity(
			core.symbol,
			core.has_extra_id,
			core.extra_id,
			core.name,
			core.warnings_from,
			core.warnings_to,
			core.validation_address,
			core.validation_extra,
			core.address_explorer,
			core.tx_explorer,
			core.confirmations_from,
		)
	}
	domainToDto(domain: CurrencyEntity): CurrencyDto {
		return new CurrencyDto(
			domain.name,
			domain.symbol,
			domain.hasExtraId,
			domain.extraId,
			domain.warningsFrom,
			domain.warningsTo,
			domain.validationAddress,
			domain.validationExtra,
			domain.addressExplorer,
			domain.txExplorer,
			domain.confirmationsFrom,
			'',
		)
	}
}

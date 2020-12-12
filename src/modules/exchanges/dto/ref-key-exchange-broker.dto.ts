import { ApikeyExchangeStatusTypes } from '../../../shared/enum/apikeyExchangeStatusTypes';
import { RefkeyExchangeBrokerOrmEntity } from '../entities/refkey-exchange-broker.orm-entity';
import { RefKeyDto } from '../../ref-keys/dto/ref-key.dto';

export class RefKeyExchangeBrokerDto {
	readonly id: number;
	readonly refKeyId: number;
	readonly status: ApikeyExchangeStatusTypes;
	readonly refKeyObject: RefKeyDto;

	constructor(data: RefkeyExchangeBrokerOrmEntity) {
		this.id = data.id;
		this.refKeyId = data.refKeyId;
		this.status = data.status;
		this.refKeyObject = data.refKeyObject;
	}
}

import { ApikeyExchangeStatusTypes } from '../../../shared/enum/apikeyExchangeStatusTypes';
import { ApikeyExchangeBrokerOrmEntity } from '../entities/apikey-exchange-broker.orm-entity';
import { ApiKeyDto } from '../../api-keys/dto/api-key.dto';

export class ApiKeyExchangeBrokerDto {
	readonly id: number;
	readonly apiKeyId: number;
	readonly status: ApikeyExchangeStatusTypes;
	readonly apiKeyObject: ApiKeyDto;

	constructor(data: ApikeyExchangeBrokerOrmEntity) {
		this.id = data.id;
		this.apiKeyId = data.apiKeyId;
		this.status = data.status;
		this.apiKeyObject = data.apiKeyObject;
	}
}

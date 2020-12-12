import { ExchangeOrmEntity } from './entities/exchange.orm-entity';
import { ApikeyExchangeBrokerOrmEntity } from './entities/apikey-exchange-broker.orm-entity';
import { RefkeyExchangeBrokerOrmEntity } from './entities/refkey-exchange-broker.orm-entity';

export const exchangesOrmProvider = [
	{provide: 'ExchangesRepository', useValue: ExchangeOrmEntity},
	{provide: 'ApikeyExchangeBrokerRepository', useValue: ApikeyExchangeBrokerOrmEntity},
	{provide: 'RefkeyExchangeBrokerRepository', useValue: RefkeyExchangeBrokerOrmEntity}
]

import { Sequelize } from 'sequelize-typescript';
import { UserEntity } from '../users/entities/user.entity';
import { ConfigService } from '../../shared/config/config.service';
import { PaymentEntity } from '../payments/entities/payment.entity';
import { PayoutEntity } from '../payouts/entities/payout.entity';
import { CashbackEntity } from '../cashbacks/entities/cashback.entity';
import { PromoCodeEntity } from '../promo-codes/enitities/promo-code.entity';
import { ApiKeyEntity } from '../api-keys/entities/api-key.entity';
import { RefKeyEntity } from '../ref-keys/entities/ref-key.entity';
import { ExchangeOrmEntity } from '../exchanges/entities/exchange.orm-entity';
import { ApikeyExchangeBrokerOrmEntity } from '../exchanges/entities/apikey-exchange-broker.orm-entity';
import { RefkeyExchangeBrokerOrmEntity } from '../exchanges/entities/refkey-exchange-broker.orm-entity';
import { AffiliateEntity } from '../affiliates/entities/affiliate.entity';
import { CustomerEntity } from '../customers/entities/customer.entity';
import { EmailEntity } from '../emails/entities/email.entity';
import { WidgetExchangeEntity } from '../widget-exchanges/entities/widget-exchange.entity';
import { IpEntity } from '../ips/entities/ip.entity';

export const postgresProviders = [
	{
		provide: 'SEQUELIZE',
		useFactory: async (configService: ConfigService) => {
			const sequelize = new Sequelize(configService.sequelizeOrmConfig);
			sequelize.addModels([
				UserEntity,
				PaymentEntity,
				PayoutEntity,
				CashbackEntity,
				PromoCodeEntity,
				ApiKeyEntity,
				RefKeyEntity,
				ExchangeOrmEntity,
				ApikeyExchangeBrokerOrmEntity,
				RefkeyExchangeBrokerOrmEntity,
				AffiliateEntity,
				CustomerEntity,
				EmailEntity,
				WidgetExchangeEntity,
				IpEntity,
			]);
			await sequelize.sync();
			return sequelize;
		},
		inject: [ConfigService],
	},
];

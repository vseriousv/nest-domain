import { Logger, Module } from '@nestjs/common';
import { ExchangeController } from './exchange.controller';
import { ExchangeService } from './services/exchange.service';
import { exchangesOrmProvider } from './exchanges.orm-provider';
import { DatabaseModule } from '../database/database.module';
import { ApiKeysService } from '../api-keys/api-keys.service';
import { apiKeysProviders } from '../api-keys/api-keys.providers';
import { RefKeysService } from '../ref-keys/ref-keys.service';
import { refKeysProviders } from '../ref-keys/ref-keys.providers';

@Module({
	imports: [DatabaseModule],
  controllers: [
  	ExchangeController
	],
  providers: [
  	ExchangeService,
		...exchangesOrmProvider,
		Logger,
		ApiKeysService,
		...apiKeysProviders,
		RefKeysService,
		...refKeysProviders
	]
})
export class ExchangesModule {}

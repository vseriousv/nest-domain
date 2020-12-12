import { Logger, Module } from '@nestjs/common';
import { ExchangeController } from './exchange.controller';
import { ExchangeService } from './services/exchange.service';
import { exchangesOrmProvider } from './exchanges.orm-provider';
import { DatabaseModule } from '../database/database.module';

@Module({
	imports: [DatabaseModule],
  controllers: [
  	ExchangeController
	],
  providers: [
  	ExchangeService,
		...exchangesOrmProvider,
		Logger,
	]
})
export class ExchangesModule {}

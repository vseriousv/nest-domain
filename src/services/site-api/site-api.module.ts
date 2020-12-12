import { Module } from '@nestjs/common';
import { SharedModule } from '../../shared/shared.module';
import { ExchangesModule } from '../../modules/exchanges/exchanges.module';
import { CurrenciesModule } from '../../modules/currencies/currencies.module';

@Module({
  providers: [],
  controllers: [],
  imports: [
		SharedModule,
		ExchangesModule,
		CurrenciesModule,
  ],
  exports: [],
})
export class SiteApiModule {
}

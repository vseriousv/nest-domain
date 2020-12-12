import { HttpModule, Module } from '@nestjs/common';
import { SharedModule } from '../../shared/shared.module';
import { CurrenciesModule } from '../../modules/currencies/currencies.module';
import { DatabaseModule } from '../../modules/database/database.module';

@Module({
  providers: [],
  controllers: [],
  imports: [
    DatabaseModule,
    HttpModule,
		SharedModule,
		CurrenciesModule,
  ],
  exports: [],
})
export class AdminApiModule {
}

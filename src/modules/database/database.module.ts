import { Module } from '@nestjs/common';
import { postgresProviders } from './postgres.providers';
import { ConfigService } from '../../shared/config/config.service';
import { mongoProviders } from './mongo.providers';

@Module({
    providers: [
    	...postgresProviders,
			...mongoProviders,
			ConfigService
		],
    exports: [
    	...postgresProviders,
			...mongoProviders,
		],
})
export class DatabaseModule {}

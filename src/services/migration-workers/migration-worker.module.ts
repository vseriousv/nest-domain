import { Logger, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigService } from '../../shared/config/config.service';
import { postgresProviders } from '../../modules/database/postgres.providers';
import { mongoProviders } from '../../modules/database/mongo.providers';
import { MigrationWorkerService } from './migration-worker.service';

@Module({
	providers: [
		MigrationWorkerService,
		...postgresProviders,
		...mongoProviders,
		ConfigService,
		Logger,
	],
	imports: [ScheduleModule.forRoot()],
})
export class MigrationWorkerModule {
}

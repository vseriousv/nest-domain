import { Bootstrap } from '../Bootstrap';
import { Config } from './config';
import { MigrationWorkerModule } from './migration-worker.module';

Bootstrap.context(MigrationWorkerModule, Config);

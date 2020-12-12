import { IServiceConfig } from '../../shared/interface/IServiceConfig';

export const Config: IServiceConfig = {
    serviceName: process.env.MIGRATION_WORKER || 'MigrationWorker',
};

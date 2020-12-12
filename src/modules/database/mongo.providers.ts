import mongoose, {connect} from 'mongoose';
import { ConfigService } from '../../shared/config/config.service';

export const mongoProviders = [
	{
		provide: 'DATABASE_CONNECTION',
		useFactory: (configService: ConfigService): Promise<typeof mongoose> =>
			connect(configService.mongooseConfig, { useNewUrlParser: true, useUnifiedTopology: true }),
		inject: [ConfigService]
	},
];

import { Injectable } from '@nestjs/common';
import config from '../../../config';

@Injectable()
export class ConfigService {
	get sequelizeOrmConfig() {
		return config.database;
	}

	get jwtConfig() {
		return { privateKey: config.jwtPrivateKey };
	}

	get mongooseConfig() {
		const mn = config.mongo;
		return mn.username || mn.password ?
			`mongodb://${mn.username}:${mn.password}@${mn.host}:${mn.port}/${mn.database}` :
			`mongodb://${mn.host}:${mn.port}/${mn.database}`;
	}

	get apiKey() {
		return config.ssApiKey;
	}

	get cryptocompare() {
		return config.cryptocompare;
	}
}

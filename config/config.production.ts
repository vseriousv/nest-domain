import { Dialect } from 'sequelize/types';

export const config = {
	database: {
		dialect: 'postgres' as Dialect,
		host: process.env.DATABASE_HOST,
		port: +process.env.DATABASE_PORT,
		username: process.env.DATABASE_USER,
		password: process.env.DATABASE_PASSWORD,
		database: process.env.DATABASE_DATABASE,
		logging: false,
	},
	mongo: {
		host: process.env.MONGO_HOST,
		port: +process.env.MONGO_PORT,
		username: process.env.MONGO_USER,
		password: process.env.MONGO_PASSWORD,
		database: process.env.MONGO_DATABASE,
	},
	runPort: +process.env.RUN_PORT,
	jwtPrivateKey: process.env.JWT_PRIVATE_KEY,
	PROXY: {
		URL: process.env.CORE_RPC_URL || 'http://localhost:5000',
	},
	ssApiKey: process.env.SIMPLESWAP_API_KEY,
	cryptocompare: process.env.CRYPTOCOMPARE_API_KEY,

};

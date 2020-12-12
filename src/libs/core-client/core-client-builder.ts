import config from '../../../config';
import urlParse from 'url';
import { Client } from 'jayson';
import { Logger } from '@nestjs/common';

export default class CoreClientBuilder {
	// private readonly logger = new Logger('CoreClient');
	public rpcClient: any;

	constructor() {
		const {host, port} = this.parseUrl(config.PROXY.URL);
		this.rpcClient = this.createRpcClient(host, port);
	}

	parseUrl = (url: string) => {
		try {
			const URL = urlParse.parse(url);
			// this.logger.log(`[URL]{${url}`)
			return {
				host: URL.hostname || '',
				port: URL.port || '',
			};
		} catch (e) {
			// console.error('Wrong url format. Please use format like "http://localhost:5000"')
			return {
				host: '',
				port: '',
			};
		}
	};

	createRpcClient = (host: string, port: string) => {
		const jClient = Client.https({ port, host });

		const handler = {
			get(target: any, name: string) {
				if (target[name]) return target[name];

				return async (...args: any) => {
					// this.logger.debug('[Calling][${name}]')
					// console.log(`[Calling][${name}], ${args}`);

					return new Promise((resolve, reject) => {
						target.request(name, args, (err: Error, response: any) => {
							if (err) {
								// console.log(`[ERROR][err]`, err);
								return reject(err);
							}

							if (response.error) {
								// console.log(`[ERROR][response.err]`, response.error);
								return reject(response.error);
							}
							// console.log(`[RESPONSE]`, response.result);
							return resolve(response.result);
						});
					});

				};
			},
		};

		return new Proxy(jClient, handler);
	};
}

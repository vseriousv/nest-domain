import CoreClientBuilder from './core-client-builder';

export default class ApiKeyClient extends CoreClientBuilder {
	createApiKey = async (apiKey: string, extraData: any = {}) => this.rpcClient.create_api_key(apiKey, extraData);
	disableApiKey = async (apiKey: string) => this.rpcClient.disable_api_key(apiKey);
	enableApiKey = async (apiKey: string) => this.rpcClient.enable_api_key(apiKey);
}

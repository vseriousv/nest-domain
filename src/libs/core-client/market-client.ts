import CoreClientBuilder from './core-client-builder';

export default class MarketClient extends CoreClientBuilder{
	generateMarketInfo = async (
		apiKey: string,
		fixed: boolean
	) => this.rpcClient.generate_market_info(apiKey, fixed);

	updateMarketInfo = async (
		apiKey: string,
		fixed: boolean
	) => this.rpcClient.update_market_info(apiKey, fixed);
}

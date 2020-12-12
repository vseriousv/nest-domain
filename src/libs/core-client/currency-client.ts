import CoreClientBuilder from './core-client-builder';

export default class CurrencyClient extends CoreClientBuilder{
	getCurrencies = async (
		apiKey: string
	) => this.rpcClient.get_currencies(apiKey);

	getCurrency = async (
		apiKey: string,
		symbol: string
	) => this.rpcClient.get_currency(apiKey, symbol);

	getAllPairs = async (
		apikey: string,
		fixed: boolean
	) => this.rpcClient.get_all_pairs(apikey, fixed);

	getPairsFor = async (
		apiKey: string,
		symbol: string,
		fixed: boolean
	) => this.rpcClient.get_pairs_for(apiKey, symbol, fixed);

}

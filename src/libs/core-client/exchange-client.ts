import CoreClientBuilder from './core-client-builder';

export default class ExchangeClient extends CoreClientBuilder {
	createExchange = async (
		apikey: string,
		fixed: boolean,
		currencyFrom: string,
		currencyTo: string,
		addressTo: string,
		amount: string,
		extraIdTo: string,
	) => this.rpcClient.create_exchange(apikey, fixed, currencyFrom, currencyTo, addressTo, amount, extraIdTo);

	getExchanges = async (
		requesterApiKey: string,
		ownerApiKey: string,
		limit: number,
		offset: number,
		filter: object,
		extended: boolean,
	) => this.rpcClient.get_exchanges(requesterApiKey, ownerApiKey, limit, offset, filter, extended);

	getExchange = async (
		apiKey: string,
		exchangeId: string,
		extended = false,
	) => this.rpcClient.get_exchange(apiKey, exchangeId, extended);

	getEstimated = async (
		apiKey: string,
		fixed: boolean,
		from: string,
		to: string,
		amount: string,
	) => this.rpcClient.get_estimated(apiKey, fixed, from, to, amount);

	getRanges = async (
		apiKey: string,
		fixed: boolean,
		from: string,
		to: string,
	) => this.rpcClient.get_ranges(apiKey, fixed, from, to);
}

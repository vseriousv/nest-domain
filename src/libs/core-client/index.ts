import ExchangeClient from './exchange-client';
import MarketClient from './market-client';
import CurrencyClient from './currency-client';
import ApiKeyClient from './api-key-client';


const exchangeClient = new ExchangeClient();
const marketClient = new MarketClient();
const currencyClient = new CurrencyClient();
const apiKeyClient = new ApiKeyClient();

export {
  exchangeClient,
  currencyClient,
  marketClient,
	apiKeyClient,
}

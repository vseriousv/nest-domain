export type TGetExchange = {
  apiKey: string,
  limit?: string,
  offset?: string,
	filter?: object,
	extended?: boolean,
}

export type TGetRanges = {
  apiKey: string,
  fixed?: boolean,
  currencyFrom: string,
  currencyTo: string,
}

export type TGetEstimated = {
  apiKey: string,
  fixed?: boolean,
  currencyFrom: string,
  currencyTo: string,
  amount: string,
}

export type TPostExchange = {
  fixed?: boolean,
  currencyFrom: string,
  currencyTo: string,
  addressTo: string,
  refundAddress?: string,
  refundExtraId?: string,
  amount: string,
  extraIdTo?: string,
}

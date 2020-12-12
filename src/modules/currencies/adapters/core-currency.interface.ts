export interface ICoreCurrency {
	symbol: string,
	has_extra_id: boolean,
	extra_id: string,
	name: string,
	warnings_from: [],
	warnings_to: [],
	validation_address: string,
	validation_extra: string | null,
	address_explorer: string,
	tx_explorer: string,
	confirmations_from: string,
	image: string,
}

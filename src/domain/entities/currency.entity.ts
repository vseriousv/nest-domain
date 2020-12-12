export class CurrencyEntity {

	constructor(
		private readonly _symbol: string,
		private readonly _hasExtraId: boolean,
		private readonly _extraId: string,
		private readonly _name: string,
		private readonly _warningsFrom: string[],
		private readonly _warningsTo: string[],
		private readonly _validationAddress: string | null,
		private readonly _validationExtra: string | null,
		private readonly _addressExplorer: string | null,
		private readonly _txExplorer: string | null,
		private readonly _confirmationsFrom: string | number,
	) {
	}

	get symbol(): string {
		return this._symbol;
	}

	get hasExtraId(): boolean {
		return this._hasExtraId;
	}

	get extraId(): string {
		return this._extraId;
	}

	get name(): string {
		return this._name;
	}

	get warningsFrom(): string[] {
		return this._warningsFrom;
	}

	get warningsTo(): string[] {
		return this._warningsTo;
	}

	get validationAddress(): string | null {
		return this._validationAddress;
	}

	get validationExtra(): string | null {
		return this._validationExtra;
	}

	get addressExplorer(): string | null {
		return this._addressExplorer;
	}

	get txExplorer(): string | null {
		return this._txExplorer;
	}

	get confirmationsFrom(): string | number {
		return this._confirmationsFrom;
	}
}

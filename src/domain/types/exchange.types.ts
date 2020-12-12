export enum TExchangeTypes {
	fixed = 'fixed',
	floating = 'floating'
}

export enum TExchangesStatuses {
	all = 'all',
	auto = 'auto',
	waiting = 'waiting',
	confirming = 'confirming',
	exchanging = 'exchanging',
	sending = 'sending',
	finished = 'finished',
	failed = 'failed',
	refunded = 'refunded',
	expired = 'expired',
	closed = 'closed'
}

export type TExchangeId = string | null;

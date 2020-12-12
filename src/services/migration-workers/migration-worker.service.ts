import { Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';

const DAY = 24 * 60 * 60 * 1000;
const HOUR = 60 * 60 * 1000;
const MINUTE = 60 * 1000;
const SECOND = 1000;

@Injectable()
export class MigrationWorkerService {
	private readonly logger = new Logger(MigrationWorkerService.name);

	constructor(
	) {
	}

	@Interval(61 * SECOND)
	async migration() {
		try {
			console.log('WORKER START');
		} catch (e) {
			this.logger.error(`[ERROR:migration]`, e.message);
		}
	}

	async delay(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
}

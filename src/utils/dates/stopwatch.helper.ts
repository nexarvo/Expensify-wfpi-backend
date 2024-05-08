import { v4 as uuid } from 'uuid';
import { WinstonLogger } from '../logger';

export class Stopwatch {
  private startTime: number | null = null;
  private timerId: string | null = null;

  private logger: WinstonLogger | null = null;

  /**
   *
   */
  constructor() {
    this.timerId = uuid();
    this.logger = new WinstonLogger();
    this.logger.setScope(__filename);
  }

  start(): void {
    this.startTime = Date.now();
    this.logger.info(`Stopwatch Timer with Id: ${this.timerId} is started.`);
  }

  getElapsedTime(): number {
    if (this.startTime === null) {
      throw new Error('Stopwatch is not started.');
    }
    const endTime = Date.now();
    const elapsed = endTime - this.startTime;
    return elapsed;
  }

  logElapsedTime(processName?: string): void {
    const elapsedTime = this.getElapsedTime();
    this.logger.info(`Stopwatch Timer with Id: ${this.timerId} has elapsed: ${elapsedTime}ms${processName ? ` after processing: ${processName}.` : '.'}`);
  }

  getTimerId(): string {
    return this.timerId;
  }

  stop(): number {
    const elapsed = this.getElapsedTime();
    this.startTime = null; // Reset the start time

    this.logger.info(`Stopwatch Timer with Id: ${this.timerId} is stopped, Total Elapsed Time ${elapsed}ms.`);
    return elapsed;
  }
}

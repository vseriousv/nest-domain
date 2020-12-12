import { Logger, LoggerService } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { IServiceConfig } from '../shared/interface/IServiceConfig';

export class Bootstrap {
  public static context(
    module: any,
    config: IServiceConfig,
    logger?: LoggerService,
  ) {
    const serviceLogger = logger || new Logger(config.serviceName, true);

    this.contextBootstrap(module, config, serviceLogger).catch(
      serviceLogger.error,
    );
  }

  private static async contextBootstrap(
    module,
    config,
    logger?: LoggerService,
  ) {
    return await NestFactory.createApplicationContext(module, {
      logger,
    });
  }
}

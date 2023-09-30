import { Global, Module } from '@nestjs/common';

import { LoggerMiddleware } from './logger.middleware';
import { LoggerService } from './logger.service';

@Global()
@Module({
  providers: [LoggerService, LoggerMiddleware],
  exports: [LoggerService, LoggerMiddleware],
})
export class LoggerModule {}

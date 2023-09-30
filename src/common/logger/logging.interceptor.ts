import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
class LoggingInterceptor implements NestInterceptor {
  constructor() {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const traceID = uuidv4();
    const start = Date.now();

    return next
      .handle()
      .pipe(
        tap((data) => {
          this.log('info', context, traceID, start, data);
        }),
      )
      .pipe(
        catchError((err) => {
          this.log('error', context, traceID, start, err);
          return throwError(err);
        }),
      );
  }

  log(level: string, context: any, traceID: string, start: number, data?: any) {
    const args = context.args['0'];
    const response = context.args['1'];
    const duration = Date.now() - start;
    const log = {
      level,
      _application: process.env.APPLICATION_NAME,
      _stage: process.env.NODE_ENV,
      timestamp: new Date(),
      userID: args.user?.id,
      traceID,
      statusCode: data && data.status ? data.status : response.statusCode,
      duration,
      inUrl: args.url,
      outUrl: undefined,
      request: undefined,
      response: undefined,
    };

    if (process.env.DEBUG === 'true') {
      log.request = {
        url: args.url,
        method: args.method,
        params: args.params,
        query: args.query,
        body: args.body,
      };
      log.response = data;
    }
    console.log(JSON.stringify(log));
  }
}

export { LoggingInterceptor };

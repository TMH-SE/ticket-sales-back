import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import chalk from 'chalk'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now()
    return next.handle().pipe(
      tap(() => {
        const ctx = context.getArgs()[3]
        console.log(
          new Date().toLocaleString(),
          '⛩  ',
          chalk.hex('#eb2f96').bold(ctx ? ctx.parentType : ''),
          '»',
          ctx ? ctx.fieldName : '',
          chalk.hex('#fff566')(`+${Date.now() - now}ms`)
        )
      })
    )
  }
}

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class TimeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // context.switchToHttp().getRequest().time = Date.now();
    return next.handle().pipe(
      map((data) => {
        data.timestamp = new Date();
        return data;
      }),
    );
  }
}

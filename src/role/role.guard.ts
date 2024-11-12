import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from './role.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles: string[] = this.reflector.get<string[]>(
      Role,
      context.getHandler(),
    );

    if (!roles) {
      return true;
    }

    const user = context.switchToHttp().getRequest().user;
    return roles.indexOf(user.role) != -1;
  }
}

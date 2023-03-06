import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  private readonly logger = new Logger(ApiKeyGuard.name);
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const REQUEST = context.switchToHttp().getRequest<Request>();
    const authHeader = REQUEST.header('Authorization');
    const AUTH = authHeader === 'pass';
    if (!AUTH) {
      throw new UnauthorizedException('no tiene permiso mi papa');
    }
    return true;
  }
}

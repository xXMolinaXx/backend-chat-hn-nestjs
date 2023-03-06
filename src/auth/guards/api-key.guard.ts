import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  private readonly logger = new Logger(ApiKeyGuard.name);
  constructor(
    private readonly reflector: Reflector,
    private configService: ConfigService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const IS_PUBLIC = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    if (IS_PUBLIC) return true;
    const REQUEST = context.switchToHttp().getRequest<Request>();
    const authHeader = REQUEST.header('Authorization');
    const AUTH = authHeader === this.configService.get<string>('API_PASS');
    if (!AUTH) {
      throw new UnauthorizedException('no tiene permiso mi papa');
    }
    return true;
  }
}

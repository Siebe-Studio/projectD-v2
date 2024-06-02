import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';


@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException();
    let payload = null;

    try {
      payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.jwtSecretKey,
      });

      request['user'] = payload;
    
    } catch (error) {
      throw new UnauthorizedException();
    }

    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if(payload.role === 'ADMIN'){
      return true;
    }

    if(roles && roles.includes(payload.role)){
      return true;
    }


    return false;
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization.split(' ') ?? [];
    return type === 'Bearer' ? token : null;
  }
}

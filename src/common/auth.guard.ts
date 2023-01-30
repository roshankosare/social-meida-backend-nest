import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpResponse } from './httpResponse';

@Injectable()
export class Authguard implements CanActivate {
  constructor(private readonly jwtService: JwtService){}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookie['jwt'];

    try {
      const user = await this.jwtService.verifyAsync(token);
      return true;
    } catch (err) {
      return false;
    }
  }
}

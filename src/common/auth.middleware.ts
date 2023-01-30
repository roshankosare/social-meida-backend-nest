import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { HttpResponse } from './httpResponse';
import { CurrentUser } from './types';
 

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
     
      const token = req.cookies['jwt'];
      if (token === undefined || null) {
        const response = new HttpResponse({
          success: true,
          message: 'Unauthorized user',
          statusCode: HttpStatus.UNAUTHORIZED,
          data:{
            authenticated:false
          }
        });
        return res.status(response.statusCode).json(response);
      }

      const user:CurrentUser = await this.jwtService.verifyAsync(token);
      req.user = user;
      next();
    } catch (err) {
      const response = new HttpResponse({
        success: true,
        message: 'Unauthorized user',
        statusCode: HttpStatus.UNAUTHORIZED,
        data:{
          authenicated:false
        }
      });
      return res.status(response.statusCode).json(response);
    }
  }
}

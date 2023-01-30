import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt/dist';
import { AuthMiddleware } from 'src/common/auth.middleware';

import { UserModule } from 'src/user/user.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PasswordService } from './password-service/password.service';
import { ValidateUserService } from './validation/validate.service';

@Module({
  imports: [
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, PasswordService, ValidateUserService],
  exports: [AuthService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '/auth/auth', method: RequestMethod.GET });
  }
}

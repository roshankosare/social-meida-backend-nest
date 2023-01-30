import { Get, HttpStatus, Injectable, Req, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';

import { HttpResponse } from 'src/common/httpResponse';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { SignInUserDto } from 'src/user/dto/signIn-user.dto';
import { UserService } from 'src/user/user.service';
import { PasswordService } from './password-service/password.service';
import { ValidateUserService } from './validation/validate.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
    private readonly validateUserService: ValidateUserService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(userDto: CreateUserDto) {
    const { email, password, username } = userDto;
    const errors = this.validateUserService.validateCreateUserDto(userDto);
    if (errors.length > 0)
      return Promise.reject(
        new HttpResponse({
          success: false,
          message: 'invalid parameters',
          statusCode: HttpStatus.BAD_REQUEST,
          data: {
            authenticated: false,
            error: errors,
          },
        }),
      );

    if (await this.userService.findOne({ email }))
      return Promise.reject(
        new HttpResponse({
          success: false,
          message: 'email is already taken',
          statusCode: HttpStatus.BAD_REQUEST,
          data: {
            authencated: false,
            errors: ['email is already registered'],
          },
        }),
      );

    const hashedPassword = await this.passwordService.hashPassword(password);

    const user = await this.userService.createUser({
      username,
      email,
      password: hashedPassword,
    });

    const userInfo  = {
      username:user.username,
      email:user.email
    }

    const payload = {
      userId: user.userId,
      username: user.username,
      email: user.email,
    };
    const access_token = this.jwtService.sign(payload);

    const response = new HttpResponse({
      success: true,
      message: 'sign up successful',
      statusCode: HttpStatus.CREATED,
      data: {
        autheticated: true,
        user:userInfo,
      },
    });

    return Promise.resolve({ response, access_token });
  }

  async signIn(userDto: SignInUserDto) {
    const { email, password } = userDto;

    const errors = this.validateUserService.validateSignInUserDto(userDto);
    if (errors.length > 0)
      return Promise.reject(
        new HttpResponse({
          success: false,
          message: 'invalid parameters',
          statusCode: HttpStatus.UNAUTHORIZED,
          data: {
            authenticated: false,
            error: errors,
          },
        }),
      );

    const user = await this.userService.findOne({ email });

    const userInfo  = {
      username:user.username,
      email:user.email
    }

    if (!user)
      return Promise.reject(
        new HttpResponse({
          success: false,
          message: 'email is incorrect ',
          statusCode: HttpStatus.UNAUTHORIZED,
          data: {
            authenticated: false,
            errors: ['incorrect email id'],
          },
        }),
      );

    if (!(await this.passwordService.comaparePassword(password, user.password)))
      return Promise.reject(
        new HttpResponse({
          success: false,
          message: 'incorrect password ',
          statusCode: HttpStatus.UNAUTHORIZED,
          data: {
            authenticated: false,
            errors: ['inccorect password'],
          },
        }),
      );

    const payload = {
      userId: user.userId,
      username: user.username,
      email: user.email,
    };
    const access_token = this.jwtService.sign(payload);

    const response = new HttpResponse({
      success: true,
      message: 'sign In successful ',
      statusCode: HttpStatus.OK,
      data: {
        authenticated: true,
        user:userInfo

      },
    });
    return Promise.resolve({ response, access_token });
  }

//   async authenticateUser(token: string) {
//     if (token === undefined || null)
//       return new HttpResponse({
//         success: true,
//         message: 'Unauthorized user',
//         statusCode: HttpStatus.UNAUTHORIZED,
//       });

//     try {
//       const user = await this.jwtService.verifyAsync(token);

//       return new HttpResponse({
//         success: true,
//         message: 'Authenticated ',
//         statusCode: HttpStatus.ACCEPTED,
//         data: { user },
//       });
//     } catch (err) {
//       return new HttpResponse({
//         success: true,
//         message: 'Unauthorized user',
//         statusCode: HttpStatus.UNAUTHORIZED,
//       });
//     }

//     // console.log(authResult)

//     return;
//   }


 }

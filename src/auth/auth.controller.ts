import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { HttpCode } from '@nestjs/common/decorators';

import { Request, Response } from 'express';
import { HttpResponse } from 'src/common/httpResponse';
import { CurrentUser } from 'src/common/types';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { SignInUserDto } from 'src/user/dto/signIn-user.dto';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(
    @Body() user: CreateUserDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const { response, access_token } = await this.authService.signUp(user);
      return res
        .status(response.statusCode)
        .cookie('jwt', access_token, { httpOnly: true })
        .json(response);
    } catch (response) {
      return res.status(response.statusCode).json(response);
    }
  }

  @Post('/signin')
  async signIn(
    @Body() user: SignInUserDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const { response , access_token } = await this.authService.signIn(user);
      return res
        .status(response.statusCode)
        .cookie('jwt', access_token, { httpOnly: true })
        .json(response);
    } catch (response) {
      return res.status(response.statusCode).json(response);
      // res.send("hii")
    }
  }

  @Get('/auth')
  async authenticateUser(@Req() req: Request, @Res() res: Response) {
    
    const user = <CurrentUser>req.user;
    const userInfo = {
      username:user.username,
      email:user.email

    }
    const response = new HttpResponse({
      success: true,
      message: 'legit User',
      statusCode: HttpStatus.ACCEPTED,
      data:{
        authenticated:true,
        user:userInfo
      }
    });
    return res.status(response.statusCode).json(response);
  }
}

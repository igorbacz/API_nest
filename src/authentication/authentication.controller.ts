import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';
import { User } from 'src/users/schema/user.model';
import { AuthenticationService } from './authentication.service';
import { Response } from 'express';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  async register(@Body() registrationData: CreateUserDto) {
    return this.authenticationService.register(registrationData);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(
    @Body() userData: User,
    // @Req() request: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = userData;
    const cookie = this.authenticationService.getCookieWithJwtToken(user.id);
    response.setHeader('Set-Cookie', cookie);
    user.password = undefined;
    //TODO return user
    return cookie;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  @HttpCode(200)
  async logOut(@Req() request: User, @Res() response: Response) {
    response.setHeader(
      'Set-Cookie',
      this.authenticationService.getCookieForLogOut(),
    );
    return response;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  authenticate(@Req() request: User) {
    const user = request;
    user.password = undefined;
    return user;
  }
}

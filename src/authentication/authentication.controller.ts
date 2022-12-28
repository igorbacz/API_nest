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
import { Response, Request } from 'express';
import JwtAuthenticationGuard from './jwt-authentication.guard';

interface RequestWithUser extends Request {
  user: User;
}

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  async register(@Body() registrationData: CreateUserDto): Promise<User> {
    return this.authenticationService.register(registrationData);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(
    @Body() userData: User,
    @Res({ passthrough: true }) response: Response,
  ): Promise<string> {
    //TODO Promise<User>
    const user = userData;
    const cookie = this.authenticationService.getCookieWithJwtToken(
      user.id,
      user.email,
    );
    response.setHeader('Set-Cookie', cookie);
    user.password = undefined;
    // return user
    //TODO Should returns user. Now returns cookie only for debugg.
    return cookie;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('logout')
  @HttpCode(200)
  async logOut(@Req() @Res() response: Response): Promise<Response> {
    response.setHeader(
      'Set-Cookie',
      this.authenticationService.getCookieForLogOut(),
    );
    return response;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser): User {
    const user = request.user;
    user.password = undefined;
    return user;
  }
}

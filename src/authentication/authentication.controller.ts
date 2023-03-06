import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from '../users/dto/CreateUser.dto';
import { User } from '../users/schema/user.model';
import { AuthenticationService } from './authentication.service';
import { Response, Request } from 'express';
import JwtAuthenticationGuard from './jwt-authentication.guard';
import { ApiBadRequestResponse, ApiCreatedResponse } from '@nestjs/swagger';
import originUrl from '../const/originUrl';

interface RequestWithUser extends Request {
  user: User;
}

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @ApiCreatedResponse({
    description: 'Created user object as response',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'User already exist, please login',
  })
  @Post('register')
  async register(@Body() registrationData: CreateUserDto): Promise<User> {
    return this.authenticationService.register(registrationData);
  }

  @ApiCreatedResponse({
    description: 'Loged user object as response',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Wrong credentials provided',
  })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(
    @Body() userData: User,
    @Res({ passthrough: true }) response: Response,
  ): Promise<User> {
    const user = userData;
    const cookie = this.authenticationService.getCookieWithJwtToken(
      user.id,
      user.email,
    );

    response.setHeader('Cookie', cookie.val);
    user.password = undefined;
    user.token = cookie.val;
    return user;
  }

  @ApiCreatedResponse({
    description: 'Cookie string for logout',
    type: String,
  })
  @UseGuards(JwtAuthenticationGuard)
  @Post('logout')
  @HttpCode(200)
  async logOut(@Req() @Res() response: Response): Promise<Response> {
    response.setHeader(
      'Cookie',
      this.authenticationService.getCookieForLogOut(),
    );
    return response;
  }

  @ApiCreatedResponse({
    description: 'Authenticated user object as response',
    type: User,
  })
  @UseGuards(JwtAuthenticationGuard)
  @Get()
  @Header('Access-Control-Allow-Origin', `${originUrl}`)
  @Header('Access-Control-Allow-Credentials', 'true')
  authenticate(@Req() request: RequestWithUser): User {
    const user = request.user;
    user.password = undefined;
    return user;
  }
}

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { Request } from 'express';
import { User } from '../users/schema/user.model';
import * as dotenv from 'dotenv';

dotenv.config();

interface TokenPayload {
  userId: string;
  email: string;
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {
    //todo Cookie - set-cookie
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Authentication;
        },
      ]),
      secretOrKey: `${process.env.ADMIN_JWT_SECRET}`,
    });
  }

  async validate(payload: TokenPayload): Promise<User> {
    return this.userService.getByEmail(payload.email);
  }
}

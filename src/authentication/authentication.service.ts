import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/CreateUser.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '../users/schema/user.model';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CookieOptions } from 'express';

interface TokenPayload {
  userId: string;
  email: string;
}

export interface ICookieType {
  name: string;
  val: string;
  options: CookieOptions;
}

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  public async register(registrationData: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    const oldUser = await this.userService.getByEmail(registrationData.email);
    if (oldUser) {
      throw new HttpException('User already exist', HttpStatus.CONFLICT);
    }
    try {
      const createdUser = await this.userService.create({
        ...registrationData,
        password: hashedPassword,
      });
      return createdUser;
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getAutheticatedUser(
    email: string,
    plainTextPassword: string,
  ): Promise<User> {
    try {
      const user = await this.userService.getByEmail(email);
      await this.verifyPasswword(plainTextPassword, user.password);
      user.password = undefined;
      return user;
    } catch (error) {
      this.logger.warn('Failed to authenticate user ');
      this.logger.error(error);
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async verifyPasswword(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<void> {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public getCookieWithJwtToken(userId: string, email: string): ICookieType {
    const payload: TokenPayload = { userId, email };
    const token = this.jwtService.sign(payload);
    return {
      name: 'Authentication',
      val: token,
      options: {
        httpOnly: true,
        maxAge: this.configService.get('JWT_EXPIRATION_TIME'),
      },
    };
  }
  public getCookieForLogOut(): string {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}

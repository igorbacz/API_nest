import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthenticationService } from './authentication.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/schema/user.model';
import { ICookieType } from './authentication.service';
import { CreateUserDto } from '../users/dto/CreateUser.dto';

describe('The AuthenticationService', () => {
  const authenticationService = new AuthenticationService(
    //@ts-ignore
    new UsersService(new Repository<User>()),
    new JwtService({
      secretOrPrivateKey: 'privateKey',
    }),
    new ConfigService(),
  );
  describe('when creating a cookie', () => {
    it('should return a string', () => {
      const userId = '1';
      const userEmail = 'email@email.com';
      expect(
        typeof authenticationService.getCookieWithJwtToken(userId, userEmail),
      ).toMatchObject<ICookieType>;
    });
  });
  describe('when creating a user', () => {
    it('should return a user  object', () => {
      const registrationData: CreateUserDto = {
        password: '12234',
        email: 'email@email.com',
      };

      expect(typeof authenticationService.register(registrationData))
        .toMatchObject<User>;
    });
  });

  describe('when getting a cookie for logout', () => {
    it('should return a string', () => {
      expect(typeof authenticationService.getCookieForLogOut()).toBe('string');
    });
  });
});

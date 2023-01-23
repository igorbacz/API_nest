import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthenticationService } from './authentication.service';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/schema/user.model';
import { ICookieType } from './authentication.service';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';

describe('The AuthenticationService', () => {
  const authenticationService = new AuthenticationService(
    //TODO refactor like in nest jes testing documentation!
    //@ts-ignore
    new UsersService(new Repository<User>()),
    new JwtService({
      secretOrPrivateKey: 'Secret key',
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

  // describe('when login a user with bad credentials', () => {
  //   it('should return an error ', () => {
  //     const loginData: CreateUserDto = {
  //       password: '12234',
  //       email: 'email@email.com',
  //     };
  //     expect(
  //       typeof authenticationService.getAutheticatedUser(
  //         loginData.email,
  //         loginData.password,
  //       ),
  //     ).toThrowError;
  //   });
  // });
});

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigModule } from '@nestjs/config';
import Joi from '@hapi/joi';
import { JwtService } from '@nestjs/jwt';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URL),
    AuthenticationModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi?.object({
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
      }),
    }),
  ],
  providers: [AuthenticationService, JwtService],
})
export class AppModule {}

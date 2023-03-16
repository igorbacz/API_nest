import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigModule } from '@nestjs/config';
import Joi from '@hapi/joi';
import { JwtService } from '@nestjs/jwt';
import { UsersModule } from './users/users.module';
import { OffersModule } from './offers/offers.module';


dotenv.config();

@Module({
  imports: [
    UsersModule,
    OffersModule,
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@cluster0.2pdcrp9.mongodb.net/?retryWrites=true&w=majority`,
    ),
    AuthenticationModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi?.object({
        ADMIN_JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
      }),
    }),
  ],
  providers: [AuthenticationService, JwtService],
})
export class AppModule {}

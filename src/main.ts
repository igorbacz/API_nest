import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import originUrl from './const/originUrl';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      credentials: true,
      origin: `${originUrl}`,
      methods: '*',
      allowedHeaders: '*',
    },
  });
  app.use(cookieParser());
  // const app = await NestFactory.create(AppModule);
  // app.use(cookieParser());
  // app.enableCors({
  //   origin: `${originUrl}`,
  //   credentials: true,
  //   allowedHeaders: ['content-type'],
  // });
  const config = new DocumentBuilder()
    .setTitle('findjob.it')
    .setDescription('The findjob.it API description')
    .setVersion('1.0')
    .addTag('findjob.it')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  //new
  await app.listen(process.env.PORT);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      credentials: true,
      origin: ['https://www.iwonagorbacz.pl/', 'http://localhost:3001'],
      methods: '*',
      // allowedHeaders: '*',
    },
  });
  app.use(cookieParser());
  const config = new DocumentBuilder()
    .setTitle('findjob.it')
    .setDescription('The findjob.it API description')
    .setVersion('1.0')
    .addTag('findjob.it')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();

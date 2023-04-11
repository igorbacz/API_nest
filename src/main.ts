import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import originUrl from './const/originUrl';
import getLogLevels from './log/getLogLevels';
import { LoggerInterceptor } from './log/logger.interceptor';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: getLogLevels(true),
  });
  app.use(cookieParser());
  app.enableCors({
    origin: `${originUrl}`,
    credentials: true,
  });
  app.useGlobalInterceptors(new LoggerInterceptor());
  const config = new DocumentBuilder()
    .setTitle('findjob.it')
    .setDescription('The findjob.it API description')
    .setVersion('1.0')
    .addTag('findjob.it')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // await app.listen(process.env.PORT);
  await app.listen(3000);
}
bootstrap();

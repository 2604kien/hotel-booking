import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:{credentials:true, origin:true}});
  app.use(cookieParser());
  await app.listen(3500);
}
bootstrap();

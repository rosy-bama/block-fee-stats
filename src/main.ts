import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const axios = require('axios')


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(2000);

}
bootstrap();

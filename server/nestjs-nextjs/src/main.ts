import { NestFactory } from '@nestjs/core';
import { AppModule } from './application.module';

import compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(compression());

  await app.listen(3000);
}

bootstrap();

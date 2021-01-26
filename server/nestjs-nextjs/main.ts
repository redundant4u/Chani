import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';

async function bootstrap() {
  const server = await NestFactory.create(AppModule);

  await server.listen(4000);
}

bootstrap();

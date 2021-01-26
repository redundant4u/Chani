import { Module } from '@nestjs/common';
import { RenderModule } from 'nest-next';
import { TypeOrmModule } from '@nestjs/typeorm';
import Next from 'next';

import { AppController } from './app.controller';
import { ChartController } from './controllers/chart.controller';
import { TableController } from './controllers/table.controller';

const APP_DIR = "./src"

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    RenderModule.forRootAsync(
      Next({
        dev: process.env.NODE_ENV !== 'production',
        dir: APP_DIR,
        conf: { useFilesystemPublicRoutes: false },
      }),
    ),
  ],
  controllers: [AppController, ChartController, TableController],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { RenderModule } from 'nest-next';
import { TypeOrmModule } from '@nestjs/typeorm';
import Next from 'next';

import { AppController } from './app.controller';
import { ChartController } from './common/controllers/chart.controller';
import { TableController } from './common/controllers/table.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    RenderModule.forRootAsync(
      Next({
        dev: process.env.NODE_ENV !== 'production',
        conf: { useFilesystemPublicRoutes: false },
      }),
    ),
  ],
  controllers: [AppController, ChartController, TableController],
  providers: [],
})
export class AppModule {}

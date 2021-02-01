import { Module } from '@nestjs/common';
import { RenderModule } from 'nest-next';
import { TypeOrmModule } from '@nestjs/typeorm';
import Next from 'next';

import { AppController } from './app.controller';
import { ListController } from './common/list/list.controller';
import { ChartController } from './common/chart/chart.controller';

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
  controllers: [AppController, ChartController, ListController],
  providers: [],
})
export class AppModule {}

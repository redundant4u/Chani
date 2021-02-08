import { Module } from '@nestjs/common';
import { RenderModule } from 'nest-next';
import { TypeOrmModule } from '@nestjs/typeorm';
import Next from 'next';

import { ListModule } from './common/list/list.module';
import { AppController } from './app.controller';
import { ChartController } from './common/chart/chart.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ListModule,
    RenderModule.forRootAsync(
      Next({
        dev: process.env.NODE_ENV !== 'production',
        conf: { useFilesystemPublicRoutes: false },
      }),
    ),
  ],
  controllers: [AppController, ChartController],
  providers: [],
})
export class AppModule {}

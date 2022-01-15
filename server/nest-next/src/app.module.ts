import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RenderModule } from 'nest-next';
import Next from 'next';

import { AppController } from './app.controller';
import { ListModule } from './list/list.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    RenderModule.forRootAsync(
      Next({
        dev: process.env.NODE_ENV !== 'production',
        conf: { useFilesystemPublicRoutes: false } as any,
      }),
    ),
    ListModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

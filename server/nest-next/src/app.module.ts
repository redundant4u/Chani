import { Module } from '@nestjs/common';
import { RenderModule } from 'nest-next';
import Next from 'next';

import { AppController } from './app.controller';
import { BlogController } from './blog/blog.controller';
import { BlogService } from './blog/blog.service';
import { ListModule } from './list/list.module';

@Module({
  imports: [
    RenderModule.forRootAsync(
      Next({
        dev: process.env.NODE_ENV !== 'production',
        conf: { useFilesystemPublicRoutes: false } as any,
      }),
    ),
    ListModule
  ],
  controllers: [AppController, BlogController],
  providers: [BlogService],
})
export class AppModule {}

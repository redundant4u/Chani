import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListEntity } from '../../entities/list.entity';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { PaginationMiddleware } from '../../middleware/PaginationMiddleware';

@Module({
    imports: [ TypeOrmModule.forFeature([ListEntity]) ],
    providers: [ ListService ],
    controllers: [ ListController ],
    exports: [ ListService ]
})
export class ListModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
    }
}
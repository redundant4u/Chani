import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ListController } from "./list.controller";
import { ListRepository } from "./list.repository";
import { ListService } from "./list.service";

@Module({
    imports: [TypeOrmModule.forFeature([ListRepository])],
    controllers: [ListController],
    providers: [ListService]
})

export class ListModule { }
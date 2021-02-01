import { Controller, Get, Render, Query } from "@nestjs/common";
// import { ListService } from './list.service';
// import { ListRO } from './list.interface';
// import { ListData } from './list.interface';
// import { ListEntity } from "src/entities/list.entity";

@Controller('/list')
export class ListController {
    // constructor(private readonly listService: ListService) {}

    @Render('list')
    @Get()
    index() {
        return {};
    }
    // async index() {
    //     const lists = await this.listService.findAll();
    //     return { lists: lists };
    // }
}
import { Controller, Get, Render, Query, Param } from "@nestjs/common";
import { ListService } from './list.service';
// import { ListRO } from './list.interface';
// import { ListData } from './list.interface';
// import { ListEntity } from "src/entities/list.entity";

@Controller('/list')
export class ListController {
    constructor(private readonly service: ListService) {}

    @Render('list')
    @Get()
    public index(@Query('page') page?: number) {
        // return this.service.find(10, page);
        return { page };
    }

    // @Get('data')
    // public get(@Query('page') page: string) {
    //     console.log('page: ' + page);
    //     return this.service.find(10, parseInt(page));
    // }

    @Get('data')
    public get() {
        return this.service.findAll();
    }

    // get(@Query() { take, skip }: any) {
    //     return this.service.findAll(take, skip);
    // }
}
import { Controller, Get, Post, Render, Query, Req, Param, Body, Res } from "@nestjs/common";
import { ListService } from './list.service';
import { ListSearch } from '../../entities/list.serach.dto';

@Controller('/list')
export class ListController {
    constructor(private readonly service: ListService) {}

    @Render('list')
    @Get()
    public index() {
        return {};
    }

    @Post('data')
    public get(@Body() body: ListSearch) {
        let result;

        if( body.fromEPS != 0.1 ) result = this.service.findEPS(body.fromEPS, body.toEPS, body.count, body.page);
        else                      result = this.service.find(body.count, body.page);

        return result;
    }
}
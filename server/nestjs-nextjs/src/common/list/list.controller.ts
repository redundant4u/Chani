import { Controller, Get, Post, Render, Body } from "@nestjs/common";
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
    public async get(@Body() body: ListSearch) {
        const result = await this.service.find(body.financials, body.count, body.page);

        return result;
    }
}
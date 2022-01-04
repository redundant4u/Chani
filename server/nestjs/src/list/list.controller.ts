import { Controller, Get, Render } from '@nestjs/common';
import { ListService } from './list.service';

@Controller('list')
export class ListController {
    constructor(private readonly listService: ListService) { }

    @Get()
    @Render('index')
    list() {
        return this.listService.list();
    }
}

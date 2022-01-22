import { Body, Controller, Get, Post, Render } from "@nestjs/common";
import { ListService } from "./list.service";
import { ListRequestDto, ListResponseDto } from "./list.dto";
import { ListEntity } from "@entity/list.entity";

@Controller("/list")
export class ListController {
    constructor(private readonly service: ListService) { }

    @Render("list")
    @Get()
    public index() {
        return {};
    }

    @Post("data")
    public async getData(@Body() request: ListRequestDto): Promise<ListResponseDto[]> {
        return await this.service.getListData(request);
    }
}
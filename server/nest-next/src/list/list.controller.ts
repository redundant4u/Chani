import { Controller, Get, Render } from "@nestjs/common";

@Controller('/list')
export class ListController {
    constructor() {}

    @Render('list')
    @Get()
    public index() {
        return {};
    }
}
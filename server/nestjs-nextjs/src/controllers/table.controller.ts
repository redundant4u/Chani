import { Controller, Get, Render } from "@nestjs/common";

@Controller('table')
export class TableController {
    @Render('table')
    @Get()
    public index() {
        return {};
    }
}
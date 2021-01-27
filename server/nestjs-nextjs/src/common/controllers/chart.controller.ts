import { Controller, Get, Render } from "@nestjs/common";

@Controller('chart')
export class ChartController {
    @Render('chart')
    @Get()
    public index() {
        return {};
    }
}
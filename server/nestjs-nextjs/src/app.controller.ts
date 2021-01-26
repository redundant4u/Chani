import { Controller, Get, Post, Render, Body } from '@nestjs/common';

@Controller()
export class AppController {
  @Render('home')
  @Get()
  public index() {
    return {};
  }

  @Post()
  findOne(@Body('search') body: string) {
    console.log('what?');
    console.log(body);
  }
}

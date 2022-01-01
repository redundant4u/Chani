import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ListModule } from './list/list.module';

// import ormconfig = require('../ormconfig');

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        ListModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }

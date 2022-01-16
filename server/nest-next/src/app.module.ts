import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { RenderModule } from "nest-next";
import Next from "next";

import { AppController } from "./app.controller";
import { ListModule } from "./list/list.module";

import { ListEntity } from "@entity/list.entity";
import { CorpEntity } from "@entity/corp.entity";
import { IndustryEntity } from "@entity/industry.entity";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT as string),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: false,
      entities: [ListEntity, CorpEntity, IndustryEntity],
    }),
    RenderModule.forRootAsync(
      Next({
        dev: process.env.NODE_ENV !== "production",
        conf: { useFilesystemPublicRoutes: false } as any,
      }),
    ),
    ListModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

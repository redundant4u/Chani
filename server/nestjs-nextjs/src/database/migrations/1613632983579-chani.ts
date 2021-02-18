import {MigrationInterface, QueryRunner} from "typeorm";

export class chani1613632983579 implements MigrationInterface {
    name = 'chani1613632983579'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "corporation" ("stock_code" character varying(10) NOT NULL, "corp_name" character varying(20) NOT NULL, "kind" smallint NOT NULL, CONSTRAINT "PK_f9466f355c430ee67ab53d583a7" PRIMARY KEY ("stock_code"))`);
        await queryRunner.query(`CREATE TABLE "industry" ("industry_code" integer NOT NULL, "industry_name" character varying(50) NOT NULL, CONSTRAINT "PK_9381705980f3ad395d185140046" PRIMARY KEY ("industry_code"))`);
        await queryRunner.query(`CREATE TABLE "list" ("id" SERIAL NOT NULL, "issued_stock" bigint NOT NULL, "total_equity_con" bigint, "total_equity" bigint, "total_assets" bigint, "revenue" bigint, "operating_profit" bigint, "net_income" bigint, "net_income_non" bigint, "net_income_con" bigint, "operating_cashflow" bigint, "total_liabilities" bigint, "eps" real, "roe" real, "corporation" character varying(10), CONSTRAINT "REL_4e218714f02d6ac683dd2894cf" UNIQUE ("corporation"), CONSTRAINT "PK_d8feafd203525d5f9c37b3ed3b9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "list" ADD CONSTRAINT "FK_4e218714f02d6ac683dd2894cf9" FOREIGN KEY ("corporation") REFERENCES "corporation"("stock_code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "list" DROP CONSTRAINT "FK_4e218714f02d6ac683dd2894cf9"`);
        await queryRunner.query(`DROP TABLE "list"`);
        await queryRunner.query(`DROP TABLE "industry"`);
        await queryRunner.query(`DROP TABLE "corporation"`);
    }

}

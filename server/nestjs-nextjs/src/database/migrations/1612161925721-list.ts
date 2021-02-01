import {MigrationInterface, QueryRunner} from "typeorm";

export class list1612161925721 implements MigrationInterface {
    name = 'list1612161925721'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "list" ("id" SERIAL NOT NULL, "stock_code" character varying(10) NOT NULL, "issued_stock" bigint NOT NULL, "total_equity_con" bigint, "total_equity" bigint, "total_assets" bigint, "revenue" bigint, "operating_profit" bigint, "net_income" bigint, "net_income_non" bigint, "net_income_con" bigint, "operating_cashflow" bigint, "total_liabilities" bigint, "eps" real, "roe" real, CONSTRAINT "PK_d8feafd203525d5f9c37b3ed3b9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "list"`);
    }

}
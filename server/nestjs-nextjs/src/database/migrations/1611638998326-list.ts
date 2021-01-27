import {MigrationInterface, QueryRunner} from "typeorm";

export class list1611638998326 implements MigrationInterface {
    name = 'list1611638998326'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "list" ("id" SERIAL NOT NULL, "stock_code" character varying(10) NOT NULL, "issued_stock" integer NOT NULL, "total_equity_con" bigint NOT NULL, "total_equity" bigint NOT NULL, "total_assets" bigint NOT NULL, "revenue" bigint NOT NULL, "operating_profit" bigint NOT NULL, "net_income" bigint NOT NULL, "net_income_non" bigint NOT NULL, "net_income_con" bigint NOT NULL, "operating_cashflow" bigint NOT NULL, "total_liabilities" bigint NOT NULL, "eps" real NOT NULL, "roe" real NOT NULL, CONSTRAINT "PK_d8feafd203525d5f9c37b3ed3b9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "list"`);
    }

}

import {MigrationInterface, QueryRunner} from "typeorm";

export class chani1613656759090 implements MigrationInterface {
    name = 'chani1613656759090'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "industries" ("industry_code" integer NOT NULL, "industry_name" character varying(50) NOT NULL, CONSTRAINT "PK_a5f1789ac5745079968d31cd142" PRIMARY KEY ("industry_code"))`);
        await queryRunner.query(`CREATE TABLE "corporations" ("stock_code" character varying(10) NOT NULL, "corp_name" character varying(20) NOT NULL, "kind" smallint NOT NULL, "industry" integer, CONSTRAINT "PK_ee19ce857699a087b5e3f60e8b9" PRIMARY KEY ("stock_code"))`);
        await queryRunner.query(`CREATE TABLE "lists" ("id" SERIAL NOT NULL, "issued_stock" bigint NOT NULL, "total_equity_con" bigint, "total_equity" bigint, "total_assets" bigint, "revenue" bigint, "operating_profit" bigint, "net_income" bigint, "net_income_non" bigint, "net_income_con" bigint, "operating_cashflow" bigint, "total_liabilities" bigint, "eps" real, "roe" real, "corporation" character varying(10), CONSTRAINT "REL_81581a2be7fc8d2550020af28e" UNIQUE ("corporation"), CONSTRAINT "PK_268b525e9a6dd04d0685cb2aaaa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "corporations" ADD CONSTRAINT "FK_d037a975b6d4091964d0e301f57" FOREIGN KEY ("industry") REFERENCES "industries"("industry_code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lists" ADD CONSTRAINT "FK_81581a2be7fc8d2550020af28e0" FOREIGN KEY ("corporation") REFERENCES "corporations"("stock_code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lists" DROP CONSTRAINT "FK_81581a2be7fc8d2550020af28e0"`);
        await queryRunner.query(`ALTER TABLE "corporations" DROP CONSTRAINT "FK_d037a975b6d4091964d0e301f57"`);
        await queryRunner.query(`DROP TABLE "lists"`);
        await queryRunner.query(`DROP TABLE "corporations"`);
        await queryRunner.query(`DROP TABLE "industries"`);
    }

}

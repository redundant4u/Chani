import {MigrationInterface, QueryRunner} from "typeorm";

export class chani1641131674998 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "industry" (
            "industry_code" integer NOT NULL,
            "industry_name" character varying(50) NOT NULL,
            CONSTRAINT "industry_pk" PRIMARY KEY ("industry_code")
        )`);

        await queryRunner.query(`CREATE TABLE "corp" (
            "stock_code" character varying(10) NOT NULL,
            "corp_name" character varying(20) NOT NULL,
            "kind" smallint NOT NULL,
            "industry" integer,
            CONSTRAINT "corp_pk" PRIMARY KEY ("stock_code")
        )`);

        await queryRunner.query(`CREATE TABLE "stock_list" (
            "id" SERIAL NOT NULL,
            "issued_stock" bigint NOT NULL,
            "total_equity_con" bigint,
            "total_equity" bigint,
            "total_assets" bigint,
            "revenue" bigint,
            "operating_profit" bigint,
            "net_income" bigint,
            "net_income_non" bigint,
            "net_income_con" bigint,
            "operating_cashflow" bigint,
            "total_liabilities" bigint,
            "eps" real,
            "roe" real,
            "corp" character varying(10),
            CONSTRAINT "corp_rel" UNIQUE ("corp"),
            CONSTRAINT "stock_list_pk" PRIMARY KEY ("id")
        )`);

        await queryRunner.query(`ALTER TABLE "corp" ADD CONSTRAINT "corp_industry_fk" FOREIGN KEY ("industry") REFERENCES "industry"("industry_code") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await queryRunner.query(`ALTER TABLE "stock_list" ADD CONSTRAINT "stock_list_corp_fk" FOREIGN KEY ("corp") REFERENCES "corp"("stock_code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stock_list" DROP CONSTRAINT "stock_list_corp_fk"`);
        await queryRunner.query(`ALTER TABLE "corp" DROP CONSTRAINT "corp_industry_fk"`);
        await queryRunner.query(`DROP TABLE "stock_list"`);
        await queryRunner.query(`DROP TABLE "corp"`);
        await queryRunner.query(`DROP TABLE "industry"`);
    }

}

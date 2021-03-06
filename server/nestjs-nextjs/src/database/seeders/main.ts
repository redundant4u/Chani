import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import { readFileSync } from "fs";

import { IndustryEntity } from "../../entities/industry.entity";
import { CorporationEntity } from "../../entities/corporation.entity";
import { ListEntity } from "../../entities/list.entity";

export class SeedMain implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection.getRepository(IndustryEntity).query(`TRUNCATE TABLE industries CASCADE`);
        await connection.getRepository(CorporationEntity).query(`TRUNCATE TABLE corporations CASCADE`);
        await connection.getRepository(ListEntity).query(`TRUNCATE TABLE lists`);

        let file = readFileSync("./src/database/industry.json", "utf8");
        let json = JSON.parse(file);
        
        for( let i of json ) {
            await connection.getRepository(IndustryEntity).save({
                industry_code: i["industry_code"],
                industry_name: i["industry_name"],
            });
        }

        file = readFileSync("./src/database/corporation.json", "utf8");
        json = JSON.parse(file);

        for( let i of json ) {
            await connection.getRepository(CorporationEntity).save({
                stock_code: i["corp_code"],
                corp_name: i["corp_name"],
                kind: i["kind"],
                industry: i["industry_code"]
            });
        }

        file = readFileSync("./src/database/result_2019.json", "utf8");
        json = JSON.parse(file);

        for( let i of json ) {
            await connection.getRepository(ListEntity).save({
                corporation: i["stock_code"],
                issued_stock: i["issued_stock"],
                total_equity_con: i["total_equity_con"],
                total_equity: i["total_equity"],
                total_assets: i["total_assets"],
                revenue: i["revenue"],
                operating_profit: i["operating_profit"],
                net_income: i["net_income"],
                net_income_non: i["net_income_non"],
                operating_cashflow: i["operating_cashflow"],
                net_income_con: i["net_income_con"],
                total_liabilities: i["total_liabilities"],
                eps: i["eps"],
                roe: i["roe"]
            });
        }
    }
}

// 108790 220250
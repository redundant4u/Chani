import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import { List } from "../../entities/list.entity";
import { readFileSync } from "fs";

export default class SeedList implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        const file = readFileSync("./src/database/result_2019.json", "utf8");
        const json = JSON.parse(file);
        
        
        for( let i of json ) {
            await connection.getRepository(List).save({
                stock_code: i["stock_code"],
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
        // await connection.getRepository(List).save(listData);
    }
}
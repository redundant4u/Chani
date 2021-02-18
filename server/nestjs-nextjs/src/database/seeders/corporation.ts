import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import { CorporationEntity } from "../../entities/corporation.entity";
import { readFileSync } from "fs";

export default class SeedCorporation implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection.getRepository(CorporationEntity).query(`TRUNCATE TABLE corporation CASCADE`);

        const file = readFileSync("./src/database/corporation.json", "utf8");
        const json = JSON.parse(file);
        
        for( let i of json ) {
            await connection.getRepository(CorporationEntity).save({
                stock_code: i["corp_code"],
                corp_name: i["corp_name"],
                kind: i["kind"],
                industry_code: i["industry_code"]
            });
        }
    }
}
import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import { IndustryEntity } from "../../entities/industry.entity";
import { readFileSync } from "fs";

export default class SeedIndustry implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection.getRepository(IndustryEntity).query(`TRUNCATE TABLE industry CASCADE`);

        const file = readFileSync("./src/database/industry.json", "utf8");
        const json = JSON.parse(file);
        
        for( let i of json ) {
            await connection.getRepository(IndustryEntity).save({
                industry_code: i["industry_code"],
                industry_name: i["industry_name"],
            });
        }
    }
}
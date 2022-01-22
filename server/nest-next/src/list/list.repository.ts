import { EntityRepository, Repository } from "typeorm";
import { ListEntity } from "@entity/list.entity";
import { ListRequestDto } from "./list.dto";

@EntityRepository(ListEntity)
export class ListRepository extends Repository<ListEntity> {
    async getListData(request: ListRequestDto): Promise<ListEntity[]> {
        const result = await this.createQueryBuilder('list')
            .select()
            .leftJoinAndSelect('list.corp', 'corp')
            .take(request.count)
            .skip(request.page)
            .getMany();

        return result;
    }
}
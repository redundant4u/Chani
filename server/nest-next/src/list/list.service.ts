import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { ListRequestDto, ListResponseDto } from "./list.dto";
import { ListRepository } from "./list.repository";

@Injectable()
export class ListService {
    constructor(
        @InjectRepository(ListRepository)
        private listRepository: ListRepository
    ) {}

    async getListData(request: ListRequestDto): Promise<ListResponseDto[]> {
        const listData = await this.listRepository.getListData(request);

        return plainToInstance(ListResponseDto, listData);
    }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { ListEntity } from '../../entities/list.entity';

@Injectable()
export class ListService {
    constructor (
    @InjectRepository(ListEntity)
        private readonly listRepository: Repository<ListEntity>
    ) {}

    async find(take: number = 10, skip: number = 0) {
        if( skip > 0 ) skip *= 10;

        const [data, total] = await this.listRepository.findAndCount({ take, skip });
        return {data, total};
        // return this.listRepository.find();
        // const [ data, total ] = this.listRepository.findAndCount({ take, skip });
        // return data;
    }

    async findEPS(
        fromEPS: number,
        toEPS: number,
        take: number = 10,
        skip: number = 0
    ) { 
        const [data, total] = await this.listRepository.findAndCount({
            where: { eps: Between(fromEPS, toEPS) },
            take: take,
            skip: skip
        })

        return {data, total};
    }

    async findAll() {
        return this.listRepository.find();
    }
}
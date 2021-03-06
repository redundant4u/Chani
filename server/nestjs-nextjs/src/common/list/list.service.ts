import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ListEntity } from '../../entities/list.entity';

@Injectable()
export class ListService {
    constructor (
    @InjectRepository(ListEntity)
        private readonly listRepository: Repository<ListEntity>
    ) {}

    public async find(
        financials: {
            orderBy: boolean,
            orderByKind: String,
            EPS: number[],
            ROE: number[]
        },
        take: number = 10,
        skip: number = 0,
    ) {
        const pass = 0.1
        let where;

        if (skip > 0) skip *= 10;

        if (financials.EPS[1] != pass && financials.ROE[1] != pass) {
            where = `
                eps BETWEEN ${financials.EPS[0]} AND ${financials.EPS[1]}
                AND
                roe BETWEEN ${financials.ROE[0]} AND ${financials.ROE[1]}
            `;
        }
        else if (financials.EPS[1] != pass)
            where = `eps BETWEEN ${financials.EPS[0]} AND ${financials.EPS[1]}`;
        else if (financials.ROE[1] != pass)
            where = `roe BETWEEN ${financials.ROE[0]} AND ${financials.ROE[1]}`;
        else 
            where = `1=1`;

        const data = await this.listRepository.createQueryBuilder('lists')
            .select()
            .leftJoinAndSelect('lists.corporation', 'corporations')
            .take(take)
            .skip(skip)
            .orderBy(`lists.${financials.orderByKind}`, financials.orderBy ? 'DESC' : 'ASC', 'NULLS LAST')
            .where(where)
            .getMany();

        const total = await this.listRepository.createQueryBuilder('lists')
            .select('lists.id')
            .where(where)
            .getCount();

        // console.log(data);
        // console.log(total);

        return {data, total};
    }
}
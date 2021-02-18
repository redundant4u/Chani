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

    private async find(
        take: number = 10,
        skip: number = 0
    ) {
        return await this.listRepository.findAndCount({
            relations: ['corporation'],
            take: take,
            skip: skip
        })
    }

    private async findEPS(
        EPS: number[],
        take: number = 10,
        skip: number = 0
    ) { 
        return await this.listRepository.findAndCount({
            relations: ['corporation'],
            where: {
                eps: Between(EPS[0], EPS[1])
            },
            take: take,
            skip: skip
        })
    }

    private async findROE(
        ROE: number[],
        take: number = 10,
        skip: number = 0,
    ) {
        return await this.listRepository.findAndCount({
            relations: ['corporation'],
            where: {
                roe: Between(ROE[0], ROE[1])
            },
            take: take,
            skip: skip
        })
    }

    private async findEPSandROE(
        financials: { EPS: number[], ROE: number[] },
        take: number = 10,
        skip: number = 0,
    ) {
        return await this.listRepository.findAndCount({
            relations: ['corporation'],
            where: {
                eps: Between(financials.EPS[0], financials.EPS[1]),
                roe: Between(financials.ROE[0], financials.ROE[1])
            },
            take: take,
            skip: skip
        })
    }

    public async findTest(
        financials: { EPS: number[], ROE: number[] },
        take: number = 10,
        skip: number = 0,
    ) {
        let data, total;
        const pass = 0.1

        if( skip > 0 ) skip *= 10;

        // if( financials.EPS[1] != pass && financials.ROE[1] != pass )
        //     [data, total] = await this.findEPSandROE(financials, take, skip);
        // else if( financials.EPS[1] != pass )
        //     [data, total] = await this.findEPS(financials.EPS, take, skip);
        // else if( financials.ROE[1] != pass )
        //     [data, total] = await this.findROE(financials.ROE, take, skip);
        // else
        //     [data, total] = await this.find(take, skip);

        [data, total] = await this.listRepository.findAndCount({
            relations: ['corporation'],
            take: take,
            skip: skip
        })

        return {data, total};
    }
}
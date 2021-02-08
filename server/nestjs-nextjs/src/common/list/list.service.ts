import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, DeleteResult } from 'typeorm';
import { ListEntity } from '../../entities/list.entity';
import { ListData } from './list.interface';

@Injectable()
export class ListService {
    constructor (
    @InjectRepository(ListEntity)
        private readonly listRepository: Repository<ListEntity>
    ) {}

    async find(take: number = 10, skip: number = 0) {
        console.log('hii');
        if( skip > 0 ) skip *= 10;
        console.log('skip: ' + (skip))

        const [data, total] = await this.listRepository.findAndCount({ take, skip });
        return data;
        // return this.listRepository.find();
        // const [ data, total ] = this.listRepository.findAndCount({ take, skip });
        // return data;
    }

    async findAll() {
        return this.listRepository.find();
    }
}
import { Injectable } from '@nestjs/common';
import { Page, PageStatus } from 'src/common/constants/Page';

@Injectable()
export class ListService {
    list(): Page {
        return { body: PageStatus.LIST };
    }
}

import { Injectable } from '@nestjs/common';
import { Page, PageStatus } from './common/constants/Page';

@Injectable()
export class AppService {
    index(): Page {
        return { body: PageStatus.INDEX };
    }
}

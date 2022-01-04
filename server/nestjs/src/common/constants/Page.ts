export interface Page {
    body: PageStatus
};

export enum PageStatus {
    INDEX = 'INDEX',
    LIST = 'LIST'
};
export class ListSearch {
    readonly count: number;
    readonly page: number;
    readonly financials: {
        readonly orderBy: boolean;
        readonly orderByKind: String;
        readonly EPS: number[];
        readonly ROE: number[];
    };
}
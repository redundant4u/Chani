export class ListSearch {
    readonly count: number;
    readonly page: number;
    readonly financials: {
        readonly EPS: number[];
        readonly ROE: number[];
    };
}
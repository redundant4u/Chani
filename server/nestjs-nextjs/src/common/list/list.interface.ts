export interface ListData {
    stock_code: string;
    issued_stock: number;
    total_equity_con: number;
    total_equity: number;
    total_assets: number;
    revenue: number;
    operating_profit: number;
    net_income: number;
    net_income_non: number;
    net_income_con: number;
    operating_cashflow: number;
    total_liabilities: number;
    eps: number;
    roe: number;
}

export interface ListRO {
    list: ListData;
}
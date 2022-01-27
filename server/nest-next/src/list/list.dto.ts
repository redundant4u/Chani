import { IsNumber, IsArray, IsString, IsOptional, IsBoolean } from "class-validator";
import { Exclude, Expose } from "class-transformer";
import { CorpEntity } from "@entity/corp.entity";

@Exclude()
export class ListRequestDto {
    @Expose()
    @IsNumber()
    readonly count: number;

    @Expose()
    @IsNumber()
    readonly page: number;

    // TRUE: asc, FALSE: desc
    @Expose()
    @IsOptional()
    @IsString()
    readonly orderBy: string;

    @Expose()
    @IsOptional()
    @IsString()
    readonly orderKind: string;

    @Expose()
    @IsOptional()
    @IsArray()
    readonly financials: {
        readonly EPS: number[];
        readonly ROE: number[];
    };
}

@Exclude()
export class ListResponseDto {
    @Expose()
    readonly corp: CorpEntity;

    @Expose()
    readonly issued_stock: number;

    @Expose()
    readonly total_equity_con: number;

    @Expose()
    readonly total_equity: number;

    @Expose()
    readonly total_assets: number;

    @Expose()
    readonly revenue: number;

    @Expose()
    readonly operating_profit: number;

    @Expose()
    readonly net_income: number;

    @Expose()
    readonly net_income_non: number;

    @Expose()
    readonly net_income_con: number;

    @Expose()
    readonly operating_cashflow: number;

    @Expose()
    readonly total_liabilities: number;

    @Expose()
    readonly eps: number;

    @Expose()
    readonly roe: number;
}
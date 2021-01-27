import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("list")
export class List {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 10 })
  stock_code: string;

  @Column({ type: "int" })
  issued_stock: number;

  @Column({ type: "bigint", nullable: true })
  total_equity_con: number;

  @Column({ type: "bigint" })
  total_equity: number;

  @Column({ type: "bigint" })
  total_assets: number;

  @Column({ type: "bigint" })
  revenue: number;

  @Column({ type: "bigint" })
  operating_profit: number;

  @Column({ type: "bigint" })
  net_income: number;

  @Column({ type: "bigint" })
  net_income_non: number;

  @Column({ type: "bigint" })
  net_income_con: number;

  @Column({ type: "bigint" })
  operating_cashflow: number;

  @Column({ type: "bigint" })
  total_liabilities: number;

  @Column({ type: "real" })
  eps: number;

  @Column({ type: "real" })
  roe: number;
}
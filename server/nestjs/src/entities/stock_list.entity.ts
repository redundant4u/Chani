import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";

import { CorpEntity } from "./corp.entity";

@Entity("stock_list")
export class StockListEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => CorpEntity, corp => corp.stock_code)
  @JoinColumn({ name: "corp" })
  corporation: CorpEntity;

  @Column({ type: "bigint" })
  issued_stock: number;

  @Column({ type: "bigint", nullable: true })
  total_equity_con: number;

  @Column({ type: "bigint", nullable: true  })
  total_equity: number;

  @Column({ type: "bigint", nullable: true  })
  total_assets: number;

  @Column({ type: "bigint", nullable: true })
  revenue: number;

  @Column({ type: "bigint", nullable: true  })
  operating_profit: number;

  @Column({ type: "bigint", nullable: true  })
  net_income: number;

  @Column({ type: "bigint", nullable: true  })
  net_income_non: number;

  @Column({ type: "bigint", nullable: true  })
  net_income_con: number;

  @Column({ type: "bigint", nullable: true  })
  operating_cashflow: number;

  @Column({ type: "bigint", nullable: true  })
  total_liabilities: number;

  @Column({ type: "real", nullable: true  })
  eps: number;

  @Column({ type: "real", nullable: true  })
  roe: number;
}
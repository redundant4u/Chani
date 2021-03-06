import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";

import { IndustryEntity } from "./industry.entity";

@Entity("corporations")
export class CorporationEntity {

  // @PrimaryGeneratedColumn()
  // id: number;
  @PrimaryColumn({ type: "varchar", length: 10 })
  stock_code: string;

  @Column({ type: "varchar", length: 20 })
  corp_name: string;

  @Column({ type: "smallint" })
  kind: number;

  @ManyToOne(type => IndustryEntity, industry => industry.industry_code)
  @JoinColumn({ name: "industry" })
  industry: IndustryEntity;

  // @ManyToOne(type => IndustryEntity, industry => industry.industry_code)
  // @JoinColumn({ name: "industry_code" })
  // industry_code: IndustryEntity;

  // @Column({ type: "bigint" })
  // captial_stock: number;
}
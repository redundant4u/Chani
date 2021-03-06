import { Entity, PrimaryColumn, Column } from "typeorm";

import { CorporationEntity } from "./corporation.entity";

@Entity("industries")
export class IndustryEntity {

  @PrimaryColumn({ type: "int" })
  industry_code: number;

  @Column({ type: "varchar", length: 50 })
  industry_name: string;
}
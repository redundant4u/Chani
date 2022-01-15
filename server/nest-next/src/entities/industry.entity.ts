import { Entity, PrimaryColumn, Column } from 'typeorm';

// import { CorpEntity } from "./corp.entity";

@Entity("industry")
export class IndustryEntity {

    @PrimaryColumn({ type: "int" })
    industry_code: number;

    @Column({ type: "varchar", length: 50 })
    industry_name: string;
}
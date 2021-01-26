import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('list')
export class ListEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  stock_code: string;

}

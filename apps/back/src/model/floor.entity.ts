import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('floor')
export class FloorEntity {
  // TODO
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  floor: number;
}

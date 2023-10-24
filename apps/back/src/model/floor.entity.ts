import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BuildingEntity } from './building.entity';
import { RestroomEntity } from './restroom.entity';

@Entity('floor')
export class FloorEntity {
  // TODO
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  floor: number;

  @ManyToOne(() => BuildingEntity, (building) => building.floors)
  building: BuildingEntity;

  @OneToMany(() => RestroomEntity, (restroom) => restroom.floorId)
  restrooms: RestroomEntity[];
}

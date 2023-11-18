import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BuildingEntity } from './building.entity';
import { RestroomEntity } from './restroom.entity';

@Entity('floor')
export class FloorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  floor: number;

  @ManyToOne(() => BuildingEntity, (building) => building.floors)
  @JoinColumn({
    name: 'buildingId',
    foreignKeyConstraintName: 'floor_buildingId_building_id',
    referencedColumnName: 'id',
  })
  building: BuildingEntity;

  @Column()
  buildingId: number;

  @OneToMany(() => RestroomEntity, (restroom) => restroom.floor)
  restrooms: RestroomEntity[];
}

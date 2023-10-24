import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProvinceEntity } from './province.entity';
import { BuildingEntity } from './building.entity';

@Entity('city')
export class CityEntity {
  // TODO
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => ProvinceEntity, (provice) => provice.cities)
  province: ProvinceEntity;

  @OneToMany(() => BuildingEntity, (building) => building.city)
  buildings: BuildingEntity[];
}

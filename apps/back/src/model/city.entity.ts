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
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToOne(() => ProvinceEntity, (province) => province.cities)
  province: ProvinceEntity;

  @OneToMany(() => BuildingEntity, (building) => building.city)
  buildings: BuildingEntity[];
}

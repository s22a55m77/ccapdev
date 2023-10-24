import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProvinceEntity } from './province.entity';

@Entity('region')
export class RegionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  // TODO unique
  name: string;

  // TODO typo
  @OneToMany(() => ProvinceEntity, (provice) => provice.region)
  provinces: ProvinceEntity[];
}

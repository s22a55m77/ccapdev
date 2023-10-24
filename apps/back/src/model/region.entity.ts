import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProvinceEntity } from './province.entity';

@Entity('region')
export class RegionEntity {
  //   TODO
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => ProvinceEntity, (provice) => provice.region)
  provinces: ProvinceEntity[];
}

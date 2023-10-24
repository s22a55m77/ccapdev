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

  @Column({ unique: true })
  name: string;

  // TODO typo
  @OneToMany(() => ProvinceEntity, (province) => province.region)
  provinces: ProvinceEntity[];
}

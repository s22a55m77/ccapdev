import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProvinceEntity } from './province.entity';
import { BarangayEntity } from './barangay.entity';

@Entity('city')
export class CityEntity {
  // TODO
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => ProvinceEntity, (provice) => provice.cities)
  province: ProvinceEntity;

  @OneToMany(() => BarangayEntity, (barangay) => barangay.city)
  barangays: BarangayEntity[];
}

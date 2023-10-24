import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RegionEntity } from './region.entity';
import { CityEntity } from './city.entity';

@Entity('province')
export class ProvinceEntity {
  //   TODO
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => RegionEntity, (region) => region.provinces)
  region: RegionEntity;

  @OneToMany(() => CityEntity, (city) => city.province)
  cities: CityEntity[];
}

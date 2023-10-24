import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RegionEntity } from './region.entity';
import { CityEntity } from './city.entity';

@Entity('province')
export class ProvinceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToOne(() => RegionEntity, (region) => region.provinces)
  @JoinColumn({
    name: 'regionId',
    foreignKeyConstraintName: 'province_regionId_region_id',
    referencedColumnName: 'id',
  })
  region: RegionEntity;
  regionId: number;

  @OneToMany(() => CityEntity, (city) => city.province)
  cities: CityEntity[];
}

import {
  Column,
  Entity,
  JoinColumn,
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
  @JoinColumn({
    name: 'provinceId',
    foreignKeyConstraintName: 'city_provinceId_province_id',
    referencedColumnName: 'id',
  })
  province: ProvinceEntity;

  @Column()
  provinceId: number;

  @OneToMany(() => BuildingEntity, (building) => building.city)
  buildings: BuildingEntity[];
}

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CityEntity } from './city.entity';
import { FloorEntity } from './floor.entity';

@Entity('building')
export class BuildingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToOne(() => CityEntity, (city) => city.buildings)
  @JoinColumn({
    name: 'cityId',
    foreignKeyConstraintName: 'building_cityId_city_id',
    referencedColumnName: 'id',
  })
  city: CityEntity;

  cityId: number;

  @OneToMany(() => FloorEntity, (floor) => floor.floor)
  floors: FloorEntity[];
}

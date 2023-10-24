import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CityEntity } from './city.entity';

@Entity('building')
export class BuildingEntity {
  // TODO
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => CityEntity, (city) => city.buildings)
  city: CityEntity;
}

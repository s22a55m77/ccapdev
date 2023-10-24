import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CityEntity } from './city.entity';

@Entity('building')
export class BuildingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  // TODO unique
  name: string;

  @ManyToOne(() => CityEntity, (city) => city.buildings)
  city: CityEntity;
}

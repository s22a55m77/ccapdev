import {
  Column,
  Entity,
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
  city: CityEntity;

  @OneToMany(() => FloorEntity, (floor) => floor.floor)
  floors: FloorEntity[];
}

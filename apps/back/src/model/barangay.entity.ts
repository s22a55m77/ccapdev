import {
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CityEntity } from './city.entity';
import { BuildingEntity } from './building.entity';

@Entity('barangay')
export class BarangayEntity {
  // TODO
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CityEntity, (city) => city.barangays)
  city: CityEntity;

  @OneToMany(() => BuildingEntity, (building) => building.barangay)
  buildings: BuildingEntity[];
}

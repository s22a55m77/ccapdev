import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BarangayEntity } from './barangay.entity';

@Entity('building')
export class BuildingEntity {
  // TODO
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => BarangayEntity, (barangay) => barangay.buildings)
  barangay: BarangayEntity;
}

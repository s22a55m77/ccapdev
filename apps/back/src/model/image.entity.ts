import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RestroomEntity } from './restroom.entity';

export enum ImageType {
  LOCATION_IMG = 'location_img',
  RESTROOM_IMG = 'restroom_img',
}

@Entity('image')
export class ImageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('bytea')
  image: string;

  @ManyToOne(() => RestroomEntity, (restroom) => restroom.images)
  @JoinColumn({
    name: 'restroomId',
    foreignKeyConstraintName: 'image_restroomId_restroom_id',
    referencedColumnName: 'id',
  })
  restroom: RestroomEntity;

  @Column()
  restroomId: number;

  @Column({
    type: 'enum',
    enum: ImageType,
  })
  type: ImageType;
}

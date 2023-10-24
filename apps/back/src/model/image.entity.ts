import {
  Column,
  Entity,
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
  //   TODO
  @PrimaryGeneratedColumn()
  id: number;

  @Column('bytea')
  image: Buffer;

  @ManyToOne(() => RestroomEntity, (restroom) => restroom.images)
  restroom: RestroomEntity;

  @Column({
    type: 'enum',
    enum: ImageType,
  })
  type: ImageType;
}

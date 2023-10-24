import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CityEntity } from './city.entity';
import { ProvinceEntity } from './province.entity';
import { RegionEntity } from './region.entity';
import { UserEntity } from './user.entity';
import { CommentEntity } from './comment.entity';
import { ImageEntity } from './image.entity';
import { ReportEntity } from './report.entity';
import { RestroomTagEntity } from './restroom-tag.entity';

export enum GenderType {
  MALE = 'male',
  FEMALE = 'female',
}

export enum StatusType {
  APPROVED = 'approved',
  DISAPPROVED = 'disapproved',
}

@Entity('restroom')
export class RestroomEntity {
  //   TODO
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.createdRestrooms)
  createdBy: UserEntity;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @Column({
    type: 'enum',
    enum: GenderType,
  })
  gender: GenderType;

  @Column({
    type: 'enum',
    enum: StatusType,
  })
  status: StatusType;

  @ManyToOne(() => RegionEntity, (region) => region)
  region: RegionEntity;

  @ManyToOne(() => ProvinceEntity)
  province: ProvinceEntity;

  @ManyToOne(() => CityEntity)
  city: CityEntity;

  @Column({ type: 'integer', unique: true, nullable: true })
  barangayId: number | null;

  @Column({ type: 'integer', unique: true, nullable: true })
  buildingId: number | null;

  @Column({ type: 'integer', unique: true, nullable: true })
  floorId: number | null;

  @Column('text')
  description: string;

  @OneToMany(() => CommentEntity, (comment) => comment.restroom)
  comments: CommentEntity[];

  @OneToMany(() => ImageEntity, (image) => image.restroom)
  images: ImageEntity[];

  @OneToMany(() => ReportEntity, (report) => report.restroom)
  reports: ReportEntity[];

  @OneToMany(
    () => RestroomTagEntity,
    (restroomTag) => restroomTag.restroom,
  )
  tags: RestroomTagEntity[];
}

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { CommentEntity } from './comment.entity';
import { ImageEntity } from './image.entity';
import { ReportEntity } from './report.entity';
import { RestroomTagEntity } from './restroom-tag.entity';
import { FloorEntity } from './floor.entity';

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
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.createdRestrooms)
  @JoinColumn({
    name: 'createdById',
    foreignKeyConstraintName: 'gender_createdById_createdBy_id',
    referencedColumnName: 'id',
  })
  createdBy: UserEntity;

  @Column()
  createdById: number;

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

  @ManyToOne(() => FloorEntity, (floor) => floor.restrooms)
  @JoinColumn({
    name: 'floorId',
    foreignKeyConstraintName: 'gender_floorId_floor_id',
    referencedColumnName: 'id',
  })
  floor: FloorEntity;

  @Column()
  floorId: number;

  @Column('text')
  description: string;

  @OneToMany(() => CommentEntity, (comment) => comment.restroom, {
    onDelete: 'CASCADE',
  })
  comments: CommentEntity[];

  @OneToMany(() => ImageEntity, (image) => image.restroom, {
    onDelete: 'CASCADE',
  })
  images: ImageEntity[];

  @OneToMany(() => ReportEntity, (report) => report.restroom, {
    onDelete: 'CASCADE',
  })
  reports: ReportEntity[];

  @OneToMany(
    () => RestroomTagEntity,
    (restroomTag) => restroomTag.restroom,
    {
      onDelete: 'CASCADE',
    },
  )
  tags: RestroomTagEntity[];
}

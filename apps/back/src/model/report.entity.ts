import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { RestroomEntity } from './restroom.entity';
import { UserEntity } from './user.entity';

export enum ReportType {
  OPEN = 'open',
  RESOLVED = 'resolved',
  CLOSED = 'closed',
}

@Entity('report')
export class ReportEntity {
  //   TODO
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => RestroomEntity, (restroom) => restroom.reports)
  restroom: RestroomEntity;

  @ManyToOne(() => UserEntity, (user) => user.reports)
  reportedBy: UserEntity;

  @CreateDateColumn()
  reportedAt: Date;

  @Column({
    type: 'enum',
    enum: ReportType,
  })
  status: ReportType;

  @ManyToOne(() => UserEntity, (user) => user.processReports)
  processBy: UserEntity;
}

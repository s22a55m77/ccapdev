import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
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
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => RestroomEntity, (restroom) => restroom.reports)
  @JoinColumn({
    name: 'restroomId',
    foreignKeyConstraintName: 'report_restroomId_restroom_id',
    referencedColumnName: 'id',
  })
  restroom: RestroomEntity;

  @Column()
  restroomId: number;

  @ManyToOne(() => UserEntity, (user) => user.reports)
  @JoinColumn({
    name: 'reportedById',
    foreignKeyConstraintName: 'report_reportedById_reportedBy_id',
    referencedColumnName: 'id',
  })
  reportedBy: UserEntity;

  @Column()
  reportedById: number;

  @CreateDateColumn()
  reportedAt: Date;

  @Column({
    type: 'enum',
    enum: ReportType,
  })
  status: ReportType;

  @ManyToOne(() => UserEntity, (user) => user.processReports)
  @JoinColumn({
    name: 'processById',
    foreignKeyConstraintName: 'report_processById_processBy_id',
    referencedColumnName: 'id',
  })
  processBy: UserEntity;

  @Column()
  processById: number;
}

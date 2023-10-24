import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommentEntity } from './comment.entity';
import { ReportEntity } from './report.entity';
import { VoteEntity } from './vote.entity';
import { RestroomEntity } from './restroom.entity';

export enum RoleType {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // TODO unique
  @Column({ unique: true })
  username: string;

  // TODO unique
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  // TODO 换成dateRegistered
  @CreateDateColumn()
  dateRegistered: Date;

  @Column('text', { nullable: true })
  description: string | null;

  @Column({
    type: 'enum',
    enum: RoleType,
    default: RoleType.USER,
  })
  role: RoleType;

  @Column('bytea', { nullable: true })
  profilePicId: Buffer | null;

  @OneToMany(() => CommentEntity, (comment) => comment.commentBy)
  comments: CommentEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.commentTo)
  receivedComments: CommentEntity[];

  @OneToMany(() => ReportEntity, (report) => report.reportedBy)
  reports: ReportEntity[];

  @OneToMany(() => ReportEntity, (report) => report.processBy)
  processReports: ReportEntity[];

  @OneToMany(() => VoteEntity, (vote) => vote.voteBy)
  votings: VoteEntity[];

  @OneToMany(() => RestroomEntity, (restroom) => restroom.createdBy)
  createdRestrooms: RestroomEntity[];
}

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RestroomEntity } from './restroom.entity';
import { UserEntity } from './user.entity';
import { VoteEntity } from './vote.entity';

export enum Type {
  REVIEW = 'Review',
  REPLY = 'Reply',
  SUBMIT = 'Submit',
}

@Entity('comment')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { nullable: true })
  rating: number | null;

  @ManyToOne(() => UserEntity, (user) => user.comments)
  @JoinColumn({
    name: 'commentById',
    foreignKeyConstraintName: 'comment_commentById_commentBy_id',
    referencedColumnName: 'id',
  })
  commentBy: UserEntity;

  @Column()
  commentById: number;

  @ManyToOne(() => CommentEntity, (comment) => comment.receivedComments)
  @JoinColumn({
    name: 'commentToId',
    foreignKeyConstraintName: 'comment_commentToId_commentTo_id',
    referencedColumnName: 'id',
  })
  commentTo?: CommentEntity;

  @Column({ nullable: true })
  commentToId?: number;

  @Column('text', { nullable: true })
  content: string;

  @ManyToOne(() => RestroomEntity, (restroom) => restroom.comments)
  @JoinColumn({
    name: 'restroomId',
    foreignKeyConstraintName: 'comment_restroomId_restroom_id',
    referencedColumnName: 'id',
  })
  restroom: RestroomEntity;

  @Column()
  restroomId: number;

  @Column({
    type: 'enum',
    enum: Type,
  })
  type: Type;

  @OneToMany(() => VoteEntity, (vote) => vote.voteTo)
  votings: VoteEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.commentTo)
  receivedComments: CommentEntity[];

  @CreateDateColumn()
  commentAt: Date;
}

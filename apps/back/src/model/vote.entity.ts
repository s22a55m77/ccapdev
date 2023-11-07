import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommentEntity } from './comment.entity';
import { UserEntity } from './user.entity';

export enum VoteType {
  UPVOTE = 'upvote',
  DOWNVOTE = 'downvote',
}

@Entity('vote')
export class VoteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.votings)
  @JoinColumn({
    name: 'voteById',
    foreignKeyConstraintName: 'vote_voteById_voteBy_id',
    referencedColumnName: 'id',
  })
  voteBy: UserEntity;

  @Column()
  voteById: number;

  @ManyToOne(() => CommentEntity, (comment) => comment.votings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'voteToId',
    foreignKeyConstraintName: 'vote_voteToId_voteTo_id',
    referencedColumnName: 'id',
  })
  voteTo: CommentEntity;

  @Column()
  voteToId: number;

  @Column({
    type: 'enum',
    enum: VoteType,
  })
  type: VoteType;
}

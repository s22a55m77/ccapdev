import {
  Column,
  Entity,
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
  voteBy: UserEntity;

  @ManyToOne(() => CommentEntity, (comment) => comment.votings)
  voteTo: CommentEntity;

  @Column({
    type: 'enum',
    enum: VoteType,
  })
  type: VoteType;
}

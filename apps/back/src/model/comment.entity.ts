import {
  Column,
  Entity,
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
  commentBy: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.receivedComments)
  commentTo: UserEntity;

  @Column('text')
  content: string;

  @ManyToOne(() => RestroomEntity, (restroom) => restroom.comments)
  restroom: RestroomEntity;

  @Column({
    type: 'enum',
    enum: Type,
  })
  type: Type;

  @OneToMany(() => VoteEntity, (vote) => vote.voteTo)
  votings: VoteEntity[];
}

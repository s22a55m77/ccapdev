import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { RestroomEntity } from './restroom.entity';
import { TagEntity } from './tag.entity';

@Unique(['restroom', 'tag'])
@Entity('restroomTag')
export class RestroomTagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => RestroomEntity, (restroom) => restroom.tags)
  @JoinColumn({
    name: 'restroomId',
    foreignKeyConstraintName: 'restroomTag_restroomId_restroom_id',
    referencedColumnName: 'id',
  })
  restroom: RestroomEntity;

  @Column()
  restroomId: number;

  @ManyToOne(() => TagEntity, (tag) => tag.restroomTags)
  @JoinColumn({
    name: 'tagId',
    foreignKeyConstraintName: 'restroomTag_tagId_tag_id',
    referencedColumnName: 'id',
  })
  tag: TagEntity;

  @Column()
  tagId: number;
}

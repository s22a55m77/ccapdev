import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { RestroomEntity } from './restroom.entity';
import { TagEntity } from './tag.entity';

// TODO restroom和tag unique
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
  restroomId: number;

  @ManyToOne(() => TagEntity, (tag) => tag.restroomTags)
  @JoinColumn({
    name: 'tagId',
    foreignKeyConstraintName: 'restroomTag_tagId_tag_id',
    referencedColumnName: 'id',
  })
  tag: TagEntity;
  tagId: number;
}

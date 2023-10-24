import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RestroomEntity } from './restroom.entity';
import { TagEntity } from './tag.entity';

// TODO restroom和tag unique
@Entity('restroomTag')
export class RestroomTagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => RestroomEntity, (restroom) => restroom.tags)
  restroom: RestroomEntity;

  @ManyToOne(() => TagEntity, (tag) => tag.restroomTags)
  tag: TagEntity;
}

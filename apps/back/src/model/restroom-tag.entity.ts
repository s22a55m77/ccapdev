import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RestroomEntity } from './restroom.entity';
import { TagEntity } from './tag.entity';

@Entity('restroomTag')
export class RestroomTagEntity {
  //   TODO
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => RestroomEntity, (restroom) => restroom.tags)
  restroom: RestroomEntity;

  @ManyToOne(() => TagEntity, (tag) => tag.restroomTags)
  tag: TagEntity;
}

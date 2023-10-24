import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RestroomTagEntity } from './restroom-tag.entity';

@Entity('tag')
export class TagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => RestroomTagEntity, (restroomTag) => restroomTag.tag)
  restroomTags: RestroomTagEntity[];
}

import { Module } from '@nestjs/common';
import { RestroomService } from './restroom.service';
import { RestroomController } from './restroom.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegionEntity } from '../../model/region.entity';
import { TagEntity } from '../../model/tag.entity';
import { RestroomEntity } from '../../model/restroom.entity';
import { ImageEntity } from '../../model/image.entity';
import { BuildingEntity } from '../../model/building.entity';
import { ProvinceEntity } from '../../model/province.entity';
import { FloorEntity } from '../../model/floor.entity';
import { CommentEntity } from '../../model/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RegionEntity,
      TagEntity,
      RestroomEntity,
      ImageEntity,
      BuildingEntity,
      ProvinceEntity,
      FloorEntity,
      CommentEntity,
    ]),
  ],
  controllers: [RestroomController],
  providers: [RestroomService],
})
export class RestroomModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuildingEntity } from '../../model/building.entity';
import { CityEntity } from '../../model/city.entity';
import { CommentEntity } from '../../model/comment.entity';
import { FloorEntity } from '../../model/floor.entity';
import { ImageEntity } from '../../model/image.entity';
import { ProvinceEntity } from '../../model/province.entity';
import { RegionEntity } from '../../model/region.entity';
import { ReportEntity } from '../../model/report.entity';
import { RestroomEntity } from '../../model/restroom.entity';
import { RestroomTagEntity } from '../../model/restroom-tag.entity';
import { TagEntity } from '../../model/tag.entity';
import { UserEntity } from '../../model/user.entity';
import { VoteEntity } from '../../model/vote.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BuildingEntity,
      CityEntity,
      CommentEntity,
      FloorEntity,
      ImageEntity,
      ProvinceEntity,
      RegionEntity,
      ReportEntity,
      RestroomEntity,
      RestroomTagEntity,
      TagEntity,
      UserEntity,
      VoteEntity,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class EntitiesModule {}

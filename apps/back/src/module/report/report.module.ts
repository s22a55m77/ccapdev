import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportEntity } from '../../model/report.entity';
import { UserService } from '../user/user.service';
import { RestroomService } from '../restroom/restroom.service';
import { UserEntity } from 'src/model/user.entity';
import { RestroomEntity } from 'src/model/restroom.entity';
import { RegionEntity } from 'src/model/region.entity';
import { TagEntity } from 'src/model/tag.entity';
import { RestroomTagEntity } from 'src/model/restroom-tag.entity';
import { ImageEntity } from 'src/model/image.entity';
import { ProvinceEntity } from 'src/model/province.entity';
import { CityEntity } from 'src/model/city.entity';
import { CommentEntity } from 'src/model/comment.entity';
import { BuildingEntity } from 'src/model/building.entity';
import { FloorEntity } from 'src/model/floor.entity';
import { VoteEntity } from 'src/model/vote.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReportEntity,
      UserEntity,
      RestroomEntity,
      RegionEntity,
      TagEntity,
      RestroomTagEntity,
      ImageEntity,
      ProvinceEntity,
      CityEntity,
      CommentEntity,
      BuildingEntity,
      FloorEntity,
      VoteEntity,
    ]),
  ],
  controllers: [ReportController],
  providers: [ReportService, UserService, RestroomService],
})
export class ReportModule {}

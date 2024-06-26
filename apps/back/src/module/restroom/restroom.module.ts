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
import { VoteEntity } from 'src/model/vote.entity';
import { CityEntity } from 'src/model/city.entity';
import { RestroomTagEntity } from 'src/model/restroom-tag.entity';
import { UserEntity } from 'src/model/user.entity';
import { UserService } from '../user/user.service';
import { CommentService } from '../comment/comment.service';
import { EntitiesModule } from '../entity/entities.module';

@Module({
  imports: [EntitiesModule],
  controllers: [RestroomController],
  providers: [RestroomService, UserService, CommentService],
})
export class RestroomModule {}

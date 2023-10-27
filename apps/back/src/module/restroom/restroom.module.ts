import { Module } from '@nestjs/common';
import { RestroomService } from './restroom.service';
import { RestroomController } from './restroom.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegionEntity } from '../../model/region.entity';
import { TagEntity } from '../../model/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RegionEntity, TagEntity])],
  controllers: [RestroomController],
  providers: [RestroomService],
})
export class RestroomModule {}

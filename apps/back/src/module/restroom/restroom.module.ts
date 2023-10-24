import { Module } from '@nestjs/common';
import { RestroomService } from './restroom.service';
import { RestroomController } from './restroom.controller';

@Module({
  controllers: [RestroomController],
  providers: [RestroomService],
})
export class RestroomModule {}

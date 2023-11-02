import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { UserService } from '../user/user.service';
import { RestroomService } from '../restroom/restroom.service';
import { EntitiesModule } from '../entity/entities.module';
import { CommentService } from '../comment/comment.service';

@Module({
  imports: [EntitiesModule],
  controllers: [ReportController],
  providers: [ReportService, UserService, RestroomService, CommentService],
})
export class ReportModule {}

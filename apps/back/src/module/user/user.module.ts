import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RestroomService } from '../restroom/restroom.service';
import { EntitiesModule } from '../entity/entities.module';
import { CommentService } from '../comment/comment.service';

@Module({
  imports: [EntitiesModule],
  controllers: [UserController],
  providers: [UserService, RestroomService, CommentService],
})
export class UserModule {}

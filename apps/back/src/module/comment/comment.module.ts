import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { UserService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';
import { RestroomService } from '../restroom/restroom.service';
import { EntitiesModule } from '../entity/entities.module';

@Module({
  imports: [EntitiesModule],
  controllers: [CommentController],
  providers: [CommentService, UserService, AuthService, RestroomService],
})
export class CommentModule {}

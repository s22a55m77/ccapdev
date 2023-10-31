import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from '../../model/comment.entity';
import { VoteEntity } from 'src/model/vote.entity';
import { UserService } from '../user/user.service';
import { UserEntity } from 'src/model/user.entity';
import { AuthController } from '../auth/auth.controller';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentEntity, VoteEntity, UserEntity]),
  ],
  controllers: [CommentController],
  providers: [CommentService, UserService, AuthService, JwtService],
})
export class CommentModule {}

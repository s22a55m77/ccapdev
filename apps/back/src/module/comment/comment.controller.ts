import {
  Controller,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { ResponseVo } from '../../common/response.vo';
import { GetCommentDetailVo } from './vo/get-comment-detail.vo';
import { UserEntity } from 'src/model/user.entity';
import { AuthUser } from '../auth/auth-user';
import { UserInterceptor } from '../auth/user.interceptor';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // GET /comment/:id
  @Get(':id')
  @UseInterceptors(UserInterceptor)
  async getCommentDetail(
    @Param('id') id: number,
    @AuthUser() user: UserEntity,
  ): Promise<ResponseVo<GetCommentDetailVo>> {
    console.log(user);
    const comment: GetCommentDetailVo =
      await this.commentService.getCommentDetail(id, user?.id || 0);

    return ResponseVo.success(comment);
  }
}

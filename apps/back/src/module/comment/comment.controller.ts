import { Controller, Get, Param } from '@nestjs/common';
import { CommentService } from './comment.service';
import { ResponseVo } from '../../common/response.vo';
import { GetCommentDetailVo } from './vo/get-comment-detail.vo';
import { AuthController } from '../auth/auth.controller';
import { UserEntity } from 'src/model/user.entity';
import { AuthUser } from '../auth/auth-user';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // GET /comment/:id
  @Get(':id')
  async getCommentDetail(
    @Param('id') id: number,
    @AuthUser() user: UserEntity,
  ): Promise<ResponseVo<GetCommentDetailVo>> {
    var comment: GetCommentDetailVo = new GetCommentDetailVo();
    if (user !== null) {
      comment = await this.commentService.getCommentDetail(id, user.id);
    } else {
      comment = await this.commentService.getCommentDetail(
        id,
        -1, // fix me: -1 === no user?
      );
    }

    return ResponseVo.success(comment);
  }
}

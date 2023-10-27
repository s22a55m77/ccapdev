import { Controller, Get, Param } from '@nestjs/common';
import { CommentService } from './comment.service';
import { ResponseVo } from '../../common/response.vo';
import { GetCommentDetailVo } from './vo/get-comment-detail.vo';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // GET /comment/:id
  @Get(':id')
  async getCommentDetail(
    @Param('id') id: string,
  ): Promise<ResponseVo<GetCommentDetailVo>> {
    const comment = await this.commentService.getCommentDetail(id);
    return ResponseVo.success(comment);
  }
}

import { Controller, Get, Param } from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // GET /comment/:id
  @Get(':id')
  getCommentDetail(@Param('id') id: string) {}
}

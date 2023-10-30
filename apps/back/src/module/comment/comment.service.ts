import { Injectable } from '@nestjs/common';
import { CommentEntity } from '../../model/comment.entity';
import { Repository } from 'typeorm';
import { GetCommentDetailVo } from './vo/get-comment-detail.vo';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseVo } from 'src/common/response.vo';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepo: Repository<CommentEntity>,
  ) {}

  async getCommentDetail(id: number): Promise<GetCommentDetailVo> {
    // TODO
    const getCommentDetailVo: GetCommentDetailVo =
      new GetCommentDetailVo();

    const commentInfo: CommentEntity = await this.commentRepo.findOne({
      where: {
        id,
      },
    });

    getCommentDetailVo.id = commentInfo.id;
    getCommentDetailVo.content = commentInfo.content;
    if (commentInfo.rating !== null)
      getCommentDetailVo.rating = commentInfo.rating;
    if (commentInfo.commentTo !== null) {
      getCommentDetailVo.commentTo = commentInfo.commentTo.id;
    }

    return getCommentDetailVo;
  }
}

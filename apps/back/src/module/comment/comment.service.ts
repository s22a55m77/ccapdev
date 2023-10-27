import { Injectable } from '@nestjs/common';
import { CommentEntity } from '../../model/comment.entity';
import { Repository } from 'typeorm';
import { GetCommentDetailVo } from './vo/get-comment-detail.vo';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepo: Repository<CommentEntity>,
  ) {}

  async getCommentDetail(id: string): Promise<GetCommentDetailVo> {
    // TODO
    return null;
  }
}

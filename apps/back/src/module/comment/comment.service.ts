import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CommentEntity } from '../../model/comment.entity';
import { Repository } from 'typeorm';
import { GetCommentDetailVo } from './vo/get-comment-detail.vo';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseVo } from 'src/common/response.vo';
import { RoleType, UserEntity } from 'src/model/user.entity';
import { UserService } from '../user/user.service';
import { VoteEntity, VoteType } from 'src/model/vote.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepo: Repository<CommentEntity>,
    @InjectRepository(VoteEntity)
    private readonly voteRepo: Repository<VoteEntity>,
    private readonly userService: UserService,
  ) {}

  async getCommentDetail(
    id: number,
    currentUserId: number,
  ): Promise<GetCommentDetailVo> {
    const getCommentDetailVo: GetCommentDetailVo =
      new GetCommentDetailVo();

    const commentInfo: CommentEntity = await this.commentRepo.findOne({
      where: {
        id,
      },
    });

    if (!commentInfo) return null;

    getCommentDetailVo.id = commentInfo.id;
    getCommentDetailVo.content = commentInfo.content;
    if (commentInfo.rating !== null)
      getCommentDetailVo.rating = commentInfo.rating;

    // commentTo
    if (commentInfo.commentToId !== null) {
      const commentToInfo: CommentEntity = await this.commentRepo.findOne({
        where: {
          id: commentInfo.commentToId,
        },
      });

      const commentToUser: UserEntity = await this.userService.getUserById(
        commentToInfo.commentById,
      );

      getCommentDetailVo.commentTo = commentToInfo.id;
      getCommentDetailVo.commentToUser = commentToUser.username;
      getCommentDetailVo.commentToUserId = commentToUser.id;
    }

    // commentBy
    const commentByUser: UserEntity = await this.userService.getUserById(
      commentInfo.commentById,
    );
    getCommentDetailVo.commentByUserId = commentByUser.id;
    getCommentDetailVo.commentBy = commentByUser.username;

    getCommentDetailVo.commentAt = new Date(
      commentInfo.commentAt,
    ).toDateString();

    // voting
    var upvoteCount = 0;
    var downvoteCount = 0;
    const votingInfos: VoteEntity[] = await this.voteRepo.find({
      where: {
        voteToId: id,
      },
    });

    getCommentDetailVo.isUpVoted = false;
    getCommentDetailVo.isDownVoted = false;
    votingInfos.forEach((voting) => {
      if (voting.type === VoteType.UPVOTE) {
        upvoteCount += 1;
        if (voting.voteById === currentUserId) {
          getCommentDetailVo.isUpVoted = true;
        }
      }
      if (voting.type === VoteType.DOWNVOTE) {
        downvoteCount += 1;
        if (voting.voteById === currentUserId) {
          getCommentDetailVo.isDownVoted = true;
        }
      }
    });
    getCommentDetailVo.downVote = downvoteCount;
    getCommentDetailVo.upVote = upvoteCount;

    // isAdmin
    getCommentDetailVo.isAdmin = false;
    if (commentByUser.role === RoleType.ADMIN)
      getCommentDetailVo.isAdmin = true;

    // childComments
    const childComments: number[] = [];
    const childCommentEntities = await this.commentRepo.find({
      where: {
        commentToId: id,
      },
    });

    childCommentEntities.forEach((childCommentEntity) => {
      childComments.push(childCommentEntity.id);
    });
    getCommentDetailVo.childComments = childComments;

    return getCommentDetailVo;
  }
}

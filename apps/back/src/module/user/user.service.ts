import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../model/user.entity';
import { InsertResult, IsNull, Not, Repository } from 'typeorm';
import * as string_decoder from 'string_decoder';
import { CommentEntity } from '../../model/comment.entity';
import { CommentService } from '../comment/comment.service';
import { RestroomEntity } from '../../model/restroom.entity';
import { GetUserProfileVo, UserHistory } from './vo/get-user-profile.vo';
import { RestroomService } from '../restroom/restroom.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(CommentEntity)
    private readonly commentRepo: Repository<CommentEntity>,
    @InjectRepository(RestroomEntity)
    private readonly restroomRepo: Repository<RestroomEntity>,
    @Inject(forwardRef(() => RestroomService))
    private readonly restroomService: RestroomService,
  ) {}

  getUserById(id: number): Promise<UserEntity> {
    return this.userRepo.findOne({
      select: {
        id: true,
        username: true,
        description: true,
        role: true,
        dateRegistered: true,
      },
      where: { id },
    });
  }

  getUserByUsername(username: string): Promise<UserEntity | null> {
    return this.userRepo.findOne({
      select: {
        id: true,
        username: true,
        password: true,
        description: true,
        role: true,
        dateRegistered: true,
      },
      where: {
        username,
      },
    });
  }

  async insertUser(user: UserEntity): Promise<UserEntity> {
    const id: number = await this.userRepo
      .insert(user)
      .then((res) => res.identifiers[0].id as number);

    return this.getUserById(id);
  }

  async updateProfilePic(id: number, image: string): Promise<UserEntity> {
    await this.userRepo.update(id, { profilePicId: image });
    return this.getUserById(Number(id));
  }

  async getProfilePicById(id: number): Promise<UserEntity> {
    return this.userRepo.findOne({
      select: {
        profilePicId: true,
      },
      where: {
        id,
      },
    });
  }

  async getUserProfile(id: number) {
    const basicUserInfo = await this.getUserById(id);
    if (!basicUserInfo) return null;

    let reviewsCount = 0;
    const [reviews, reviewCount] = await this.commentRepo.findAndCount({
      select: {
        id: true,
        restroomId: true,
      },
      where: {
        commentById: id,
        commentTo: IsNull(),
      },
    });
    reviewsCount += reviewCount;
    const reviewPromise = reviews.map(async (obj: CommentEntity) => {
      const review = await this.commentRepo.findOne({
        select: {
          content: true,
          rating: true,
        },
        where: {
          id: obj.id,
        },
      });

      const reviewHistory: UserHistory = {
        id: obj.id,
        title: await this.restroomService.getRestroomTitle(obj.restroomId),
        content: review.content,
        rating: review.rating,
        commentByUserId: basicUserInfo.id,
        commentBy: basicUserInfo.username,
        type: 'Review',
      };

      return reviewHistory;
    });

    const reviewHistory: UserHistory[] = await Promise.all(reviewPromise);

    const [reply, replyCount] = await this.commentRepo.findAndCount({
      select: {
        id: true,
        restroomId: true,
      },
      where: {
        commentById: id,
        commentTo: Not(IsNull()),
      },
    });
    reviewsCount += replyCount;
    const replyPromise = reply.map(async (obj: CommentEntity) => {
      const reply = await this.commentRepo.findOne({
        select: {
          content: true,
          commentToId: true,
        },
        where: {
          id: obj.id,
        },
      });

      const { username } = await this.commentRepo
        .createQueryBuilder('c')
        .select('u.username')
        .leftJoin(UserEntity, 'u', 'u.id=c."commentById"')
        .where('c.id = :id', { id: reply.commentToId })
        .getRawOne();

      const replyHistory: UserHistory = {
        id: obj.id,
        title: await this.restroomService.getRestroomTitle(obj.restroomId),
        content: reply.content,
        commentTo: reply.commentToId,
        commentToUser: username,
        commentByUserId: basicUserInfo.id,
        commentBy: basicUserInfo.username,
        type: 'Reply',
      };

      return replyHistory;
    });

    const replyHistory: UserHistory[] = await Promise.all(replyPromise);

    const [submitIds, submitCount] = await this.restroomRepo.findAndCount({
      select: {
        id: true,
      },
      where: {
        createdById: id,
      },
    });
    reviewsCount += submitCount;

    const submitPromise = submitIds.map(async (obj: { id: number }) => {
      const info = await this.restroomRepo.findOne({
        select: {
          id: true,
          description: true,
          createdById: true,
        },
        where: {
          id: obj.id,
        },
      });

      const submitHistory: UserHistory = {
        id: info.id,
        title: await this.restroomService.getRestroomTitle(info.id),
        content: info.description,
        commentByUserId: info.createdById,
        commentBy: basicUserInfo.username,
        type: 'Submit',
      };

      return submitHistory;
    });
    const submitHistory: UserHistory[] = await Promise.all(submitPromise);

    const vo = new GetUserProfileVo();
    vo.id = basicUserInfo.id;
    vo.username = basicUserInfo.username;
    vo.reviews = reviewsCount;
    vo.dateRegistered = new Date(
      basicUserInfo.dateRegistered,
    ).toDateString();
    vo.description = basicUserInfo.description;
    vo.role = basicUserInfo.role;
    vo.profilePicId = basicUserInfo.id;
    vo.history = [...submitHistory, ...reviewHistory, ...replyHistory];
    return vo;
  }
}

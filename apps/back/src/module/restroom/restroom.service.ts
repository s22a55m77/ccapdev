import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegionEntity } from '../../model/region.entity';
import { DeleteResult, Repository } from 'typeorm';
import { renameKey } from '../../common/utils';
import {
  FilterDataType,
  GetFilterOptionsVo,
} from './vo/get-filter-options.vo';
import { TagEntity } from '../../model/tag.entity';
import { GetRestroomDetailVo } from './vo/get-restroom-detail.vo';
import { CreateRestroomDto } from './dto/create-restroom.dto';
import { ImageEntity, ImageType } from '../../model/image.entity';
import { BuildingEntity } from '../../model/building.entity';
import { FloorEntity } from '../../model/floor.entity';
import { CreateRestroomVo } from './vo/create-restroom.vo';
import { CreateRestroomReviewVo } from './vo/create-restroom-review.vo';
import { CreateRestroomReviewDto } from './dto/create-restroom-review.dto';
import { CommentEntity, Type } from '../../model/comment.entity';
import { UpdateRestroomReviewDto } from './dto/update-restroom-review.dto';
import { UpdateRestroomReviewVo } from './vo/update-restroom-review.vo';
import { RestroomEntity, StatusType } from '../../model/restroom.entity';
import { ChangeVoteStatusVo } from './vo/change-vote-status.vo';
import { VoteEntity, VoteType } from 'src/model/vote.entity';
import { ProvinceEntity } from 'src/model/province.entity';
import { CityEntity } from 'src/model/city.entity';
import { RestroomTagEntity } from 'src/model/restroom-tag.entity';
import { GetRestroomListVo } from './vo/get-restroom-list.vo';
import { UserEntity } from 'src/model/user.entity';
import { UserService } from '../user/user.service';
import { CommentService } from '../comment/comment.service';

@Injectable()
export class RestroomService {
  constructor(
    @InjectRepository(RestroomEntity)
    private readonly restroomRepo: Repository<RestroomEntity>,
    @InjectRepository(RegionEntity)
    private readonly regionRepo: Repository<RegionEntity>,
    @InjectRepository(TagEntity)
    private readonly tagRepo: Repository<TagEntity>,
    @InjectRepository(RestroomTagEntity)
    private readonly restroomTagRepo: Repository<RestroomTagEntity>,
    @InjectRepository(ImageEntity)
    private readonly imageRepo: Repository<ImageEntity>,
    @InjectRepository(ProvinceEntity)
    private readonly provinceRepo: Repository<ProvinceEntity>,
    @InjectRepository(CityEntity)
    private readonly cityRepo: Repository<CityEntity>,
    @InjectRepository(BuildingEntity)
    private readonly buildingRepo: Repository<BuildingEntity>,
    @InjectRepository(FloorEntity)
    private readonly floorRepo: Repository<FloorEntity>,
    @InjectRepository(CommentEntity)
    private readonly commentRepo: Repository<CommentEntity>,
    @InjectRepository(VoteEntity)
    private readonly voteRepo: Repository<VoteEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private readonly userService: UserService,
    private readonly commentService: CommentService,
  ) {}

  async getFilterOptions(): Promise<GetFilterOptionsVo> {
    let location: FilterDataType[] = await this.regionRepo
      .createQueryBuilder('region')
      .select([
        'region.name',
        'region.id',
        'provinces.name',
        'provinces.id',
        'cities.name',
        'cities.id',
        'buildings.id',
        'buildings.name',
        'floors.id',
        'floors.floor',
      ])
      .leftJoin('region.provinces', 'provinces')
      .leftJoin('provinces.cities', 'cities')
      .leftJoin('cities.buildings', 'buildings')
      .leftJoin('buildings.floors', 'floors')
      // .leftJoin(
      //   BuildingEntity,
      //   'buildings',
      //   'buildings."cityId"=cities.id',
      // )
      // .leftJoin(FloorEntity, 'floors', 'floors."buildingId"=buildings.id')
      .orderBy('region.name, provinces.name, cities.name', 'ASC')
      .getMany()
      // FIXME type casting
      .then((res) => res as unknown as FilterDataType[]);

    location = renameKey(location, 'label', 'name');
    location = renameKey(location, 'label', 'floor');
    location = renameKey(location, 'value', 'id');
    location = renameKey(location, 'children', 'provinces');
    location = renameKey(location, 'children', 'cities');
    location = renameKey(location, 'children', 'buildings');
    location = renameKey(location, 'children', 'floors');

    const gender: FilterDataType[] = [
      {
        label: 'Male',
        value: 'Male',
      },
      {
        label: 'Female',
        value: 'Female',
      },
    ];

    let availability: FilterDataType[] = await this.tagRepo
      .find({ select: { name: true, id: true } })
      // FIXME type casting
      .then((res) => res as unknown as FilterDataType[]);

    availability = renameKey(availability, 'label', 'name');
    availability = renameKey(availability, 'value', 'id');
    // availability = addKeyFromExistingField(availability, 'value', 'label');

    return { location: location, gender: gender, availability };
  }

  async getRestroomDetail(
    id: number,
  ): Promise<GetRestroomDetailVo | null> {
    const restroomInfo = await this.restroomRepo.findOne({
      where: {
        id,
      },
    });

    if (restroomInfo == null) return null;

    const gender: string = restroomInfo.gender.toString();

    const locationInfo = await this.floorRepo
      .createQueryBuilder('f')
      .select([
        'r2.name AS region',
        'p.name AS province',
        'c.name AS city',
        'b.name AS building',
        'f.floor AS floor',
      ])
      .leftJoin(BuildingEntity, 'b', 'b.id=f."buildingId"')
      .leftJoin(CityEntity, 'c', 'c.id=b."cityId"')
      .leftJoin(ProvinceEntity, 'p', 'p.id=c."provinceId"')
      .leftJoin(RegionEntity, 'r2', 'r2.id=p."regionId"')
      .where('f.id = :id', { id: restroomInfo.floorId })
      .getRawOne();

    const title = `${locationInfo.building} - ${locationInfo.floor} - ${gender} - ${locationInfo.city} - ${locationInfo.province} - ${locationInfo.region}`;

    // location
    const locationImageIds: number[] = [];
    const restroomImageIds: number[] = [];

    const images: ImageEntity[] = await this.imageRepo.find({
      where: {
        restroomId: id,
      },
    });
    images.forEach((image) => {
      if (image.type === ImageType.LOCATION_IMG)
        locationImageIds.push(image.id);
      if (image.type === ImageType.RESTROOM_IMG)
        restroomImageIds.push(image.id);
    });

    // rating & comment
    let rating: number = 0;
    let ratingCount: number = 0;
    const commentsIds: number[] = [];
    let totalComments: number = 0;

    const comments: CommentEntity[] = await this.commentRepo.find({
      where: {
        restroomId: id,
        type: Type.REVIEW,
      },
    });

    comments.forEach((comment) => {
      if (comment.type !== Type.SUBMIT) {
        if (comment.type === Type.REVIEW) {
          if (comment.rating != null) {
            rating += comment.rating;
            ratingCount += 1;
          }
        }
        commentsIds.push(comment.id);
        totalComments += 1;
      }
    });
    if (ratingCount !== 0) {
      rating = rating / ratingCount;
    }

    // tags
    const tagnames: string[] = [];
    const tags: RestroomTagEntity[] = await this.restroomTagRepo.find({
      where: {
        restroomId: id,
      },
    });
    const tagPromises = tags.map(async (restroomTag) => {
      const tag: TagEntity = await this.tagRepo.findOne({
        where: {
          id: restroomTag.tagId,
        },
      });
      return tag.name;
    });

    tagnames.push(...(await Promise.all(tagPromises)));

    // createdByUser
    const createdByUser: UserEntity = await this.userRepo.findOne({
      where: {
        id: restroomInfo.createdById,
      },
    });

    const restroomDetail = new GetRestroomDetailVo();
    restroomDetail.id = restroomInfo.id;
    restroomDetail.title = title;
    restroomDetail.building = locationInfo.building;
    restroomDetail.floor = locationInfo.floor;
    restroomDetail.location = restroomInfo.description;
    restroomDetail.rating = rating;
    restroomDetail.tags = tagnames;
    restroomDetail.locationImageIds = locationImageIds;
    restroomDetail.restroomImageIds = restroomImageIds;
    restroomDetail.commentsIds = commentsIds;
    restroomDetail.totalComments = totalComments;
    restroomDetail.gender = restroomInfo.gender;
    restroomDetail.createdByUser = createdByUser.username;
    restroomDetail.createdByUserId = createdByUser.id;
    restroomDetail.createdAt = restroomInfo.createdAt.toDateString();

    return restroomDetail;
  }

  async createRestroom(
    createRestroomDto: CreateRestroomDto,
    files: {
      locationImages: Express.Multer.File[];
      restroomImages: Express.Multer.File[];
    },
    currentUserId: number,
  ): Promise<CreateRestroomVo> {
    const { building, floor, gender, tags, city, province, location } =
      createRestroomDto;
    // TODO 需要insert到多个table
    // insert buildingRepo (if not exist)
    const provinceEntity: ProvinceEntity = await this.provinceRepo.findOne(
      {
        where: {
          id: province,
        },
      },
    );

    const cityEntity: CityEntity = await this.cityRepo.findOne({
      where: {
        id: city,
        provinceId: provinceEntity.id,
      },
    });

    let buildingEntity = await this.buildingRepo.findOne({
      where: {
        name: building,
        cityId: cityEntity.id,
      },
    });

    if (!buildingEntity) {
      buildingEntity = this.buildingRepo.create({
        name: building,
        cityId: cityEntity.id,
      });
      await this.buildingRepo.save(buildingEntity);
    }

    // insert restroomRepo

    // see if floor exist
    let floorEntity: FloorEntity = await this.floorRepo.findOne({
      where: {
        buildingId: buildingEntity.id,
        floor,
      },
    });
    // yes -> use the existing floorId, no -> create new floor
    if (!floorEntity) {
      floorEntity = this.floorRepo.create({
        floor,
        buildingId: buildingEntity.id,
      });
    }
    await this.floorRepo.save(floorEntity);

    // create restroom
    const restroomEntity = this.restroomRepo.create({
      gender,
      status: StatusType.APPROVED,
      description: location,
      createdById: currentUserId,
      floorId: floorEntity.id,
    });
    await this.restroomRepo.save(restroomEntity);

    // insert restroomTagRepo

    if (tags) {
      for (const tag of tags) {
        const tagEntity: TagEntity = await this.tagRepo.findOne({
          where: {
            name: tag,
          },
        });
        const restroomTagEntity = this.restroomTagRepo.create({
          restroomId: restroomEntity.id,
          tagId: tagEntity.id,
        });
        await this.restroomTagRepo.save(restroomTagEntity);
      }
    }

    // insert imageRepo
    const saveImage = async (
      type: ImageType,
      file: Express.Multer.File,
    ) => {
      const imageEntity = this.imageRepo.create({
        image: file.buffer.toString('base64'),
        restroomId: restroomEntity.id,
        type,
      });
      await this.imageRepo.save(imageEntity);
    };

    if (files.locationImages)
      for (const file of files.locationImages) {
        await saveImage(ImageType.LOCATION_IMG, file);
      }

    if (files.restroomImages)
      for (const file of files.restroomImages) {
        await saveImage(ImageType.RESTROOM_IMG, file);
      }

    // query
    const createRestroomVo: CreateRestroomVo = new CreateRestroomVo();
    // restroom
    const getRestroomDetailVo: GetRestroomDetailVo =
      await this.getRestroomDetail(restroomEntity.id);

    for (let key in getRestroomDetailVo) {
      if (getRestroomDetailVo.hasOwnProperty(key)) {
        createRestroomVo[key] = getRestroomDetailVo[key];
      }
    }
    return createRestroomVo;
  }

  async createRestroomReview(
    id: number,
    createRestroomReviewDto: CreateRestroomReviewDto,
    currentUserId: number,
  ): Promise<CreateRestroomReviewVo> {
    // TODO insert完需要再查出返回数据
    const { rating, commentTo, content } = createRestroomReviewDto;
    let commentEntity: CommentEntity = null;
    if (rating) {
      commentEntity = this.commentRepo.create({
        rating,
        commentById: currentUserId,
        content,
        restroomId: id,
        type: Type.REVIEW,
      });
      commentEntity = await this.commentRepo.save(commentEntity);
      return this.commentService.getCommentDetail(
        commentEntity.id,
        currentUserId,
      );
    } else if (commentTo) {
      commentEntity = this.commentRepo.create({
        commentToId: commentTo,
        commentById: currentUserId,
        content,
        restroomId: id,
        type: Type.REPLY,
      });
      commentEntity = await this.commentRepo.save(commentEntity);
      return this.commentService.getCommentDetail(
        commentTo,
        currentUserId,
      );
    }
    return null;
  }

  async updateRestroomReview(
    userId: number,
    id: number,
    updateRestroomReviewDto: UpdateRestroomReviewDto,
  ): Promise<UpdateRestroomReviewVo> {
    const comment = new CommentEntity();
    comment.id = id;
    comment.content = updateRestroomReviewDto.content;
    await this.commentRepo.save(comment);
    const commentDetail = (await this.commentService.getCommentDetail(
      id,
      userId,
    )) as UpdateRestroomReviewVo;
    return commentDetail;
  }

  async deleteRestroomReview(id): Promise<DeleteResult> {
    return this.commentRepo.delete(id);
  }

  async changeVoteStatus(
    id: number,
    newStatus: number,
    userId: number,
  ): Promise<ChangeVoteStatusVo> {
    const vote = await this.voteRepo.findOne({
      where: {
        voteById: userId,
        voteToId: id,
      },
    });
    if (vote) {
      if (newStatus !== 0) {
        this.voteRepo.update(vote.id, {
          type: newStatus === 1 ? VoteType.UPVOTE : VoteType.DOWNVOTE,
        });
        return this.commentService.getCommentDetail(id, userId);
      }
      if (newStatus === 0) {
        await this.voteRepo.delete(vote.id);
        return this.commentService.getCommentDetail(id, userId);
      }
    }

    let voteEntity = new VoteEntity();
    voteEntity.voteToId = id;
    voteEntity.voteById = userId;
    voteEntity.type =
      newStatus === 1 ? VoteType.UPVOTE : VoteType.DOWNVOTE;

    await this.voteRepo.save(voteEntity);
    return this.commentService.getCommentDetail(id, userId);
  }

  async getRestroomList({
    sort,
    gender,
    availability,
    region,
    province,
    city,
    building,
    floor,
  }): Promise<GetRestroomListVo[]> {
    const filterQB = this.restroomRepo
      .createQueryBuilder('r')
      .select('DISTINCT r.id AS id')
      .leftJoin(RestroomTagEntity, 'rt', 'r.id=rt.restroomId')
      .leftJoin(FloorEntity, 'f', 'f.id=r."floorId"')
      .leftJoin(BuildingEntity, 'b', 'b.id=f."buildingId"')
      .leftJoin(CityEntity, 'c', 'c.id=b."cityId"')
      .leftJoin(ProvinceEntity, 'p', 'p.id=c."provinceId"')
      .leftJoin(RegionEntity, 'r2', 'r2.id=p."regionId"')
      .andWhere('r.status = :status', { status: StatusType.APPROVED });

    if (gender)
      filterQB.where('r.gender = :gender', {
        gender: gender.toLowerCase(),
      });

    if (availability)
      filterQB.andWhere('rt.tagId IN (:...tags)', { tags: availability });

    if (region) filterQB.andWhere('r2.id IN (:...region)', { region });

    if (province)
      filterQB.andWhere('p.id IN (:...province)', { province });

    if (city) filterQB.andWhere('c.id IN (:...city)', { city });

    if (building)
      filterQB.andWhere('b.id IN (:...building)', { building });

    if (floor) filterQB.andWhere('f.id IN (:...floor)', { floor });

    const filteredRestroomIds = await filterQB.execute();

    const restroomIds = filteredRestroomIds.map((id) => id.id);

    const restroomDetailsPromises = restroomIds.map((id) =>
      this.getRestroomDetail(id),
    );

    const restroomDetails = await Promise.all(restroomDetailsPromises);

    // Remove unnecessary properties
    restroomDetails.forEach((detail) => {
      delete detail.commentsIds;
      delete detail.locationImageIds;
      detail.restroomImageIds = detail.restroomImageIds.slice(0, 3);
    });

    // Sort the results based on the chosen sort option
    if (sort === 'RATING') {
      restroomDetails.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'NEW') {
      restroomDetails.sort(
        (a, b) =>
          new Date(b.createdAt).valueOf() -
          new Date(a.createdAt).valueOf(),
      );
    }

    return restroomDetails;
  }

  async getRestroomTitle(id: number): Promise<string> {
    const info = await this.restroomRepo
      .createQueryBuilder('r')
      .select([
        'r.gender AS gender',
        'r2.name AS region',
        'p.name AS province',
        'c.name AS city',
        'b.name AS building',
        'f.floor AS floor',
      ])
      .leftJoin(FloorEntity, 'f', 'f.id=r."floorId"')
      .leftJoin(BuildingEntity, 'b', 'b.id=f."buildingId"')
      .leftJoin(CityEntity, 'c', 'c.id=b."cityId"')
      .leftJoin(ProvinceEntity, 'p', 'p.id=c."provinceId"')
      .leftJoin(RegionEntity, 'r2', 'r2.id=p."regionId"')
      .where('r.id = :id', { id })
      .getRawOne();

    const title = `${info.building} - ${info.floor} - ${info.gender} - ${info.city} - ${info.province} - ${info.region}`;

    return title;
  }

  async getImage(id: number): Promise<ImageEntity> {
    return this.imageRepo.findOne({
      select: {
        image: true,
      },
      where: {
        id,
      },
    });
  }
}

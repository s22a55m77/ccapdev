import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegionEntity } from '../../model/region.entity';
import { DeleteResult, Repository } from 'typeorm';
import { addKeyFromExistingField, renameKey } from '../../common/utils';
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
import {
  GenderType,
  RestroomEntity,
  StatusType,
} from '../../model/restroom.entity';
import { ChangeVoteStatusVo } from './vo/change-vote-status.vo';
import { GetAdminReportListVo } from './vo/get-admin-report-list.vo';
import { VoteEntity, VoteType } from 'src/model/vote.entity';
import { ProvinceEntity } from 'src/model/province.entity';
import { CityEntity } from 'src/model/city.entity';
import { RestroomTagEntity } from 'src/model/restroom-tag.entity';
import { UserEntity } from 'src/model/user.entity';
import { AuthUser } from '../auth/auth-user';

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
  ) {}

  async getFilterOptions(): Promise<GetFilterOptionsVo> {
    // TODO add building and floor
    let location: FilterDataType[] = await this.regionRepo
      .createQueryBuilder('region')
      .select([
        'region.name',
        'region.id',
        'provinces.name',
        'provinces.id',
        'cities.name',
        'cities.id',
      ])
      .leftJoin('region.provinces', 'provinces')
      .leftJoin('provinces.cities', 'cities')
      .orderBy('region.name, provinces.name, cities.name', 'ASC')
      .getMany()
      // FIXME type casting
      .then((res) => res as unknown as FilterDataType[]);

    location = renameKey(location, 'label', 'name');
    location = renameKey(location, 'value', 'id');
    location = renameKey(location, 'children', 'provinces');
    location = renameKey(location, 'children', 'cities');

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
      .find({ select: { name: true } })
      // FIXME type casting
      .then((res) => res as unknown as FilterDataType[]);

    availability = renameKey(availability, 'label', 'name');
    availability = addKeyFromExistingField(availability, 'value', 'label');

    return { location: location, gender: gender, availability };
  }

  async getRestroomDetail(
    id: number,
  ): Promise<GetRestroomDetailVo | null> {
    // TODO
    const restroomInfo = await this.restroomRepo.findOne({
      where: {
        id,
      },
    });

    if (restroomInfo == null) return null;

    // title
    var title: string;
    const gender: string = restroomInfo.gender.toString();
    const floor: FloorEntity = await this.floorRepo.findOne({
      where: {
        id: restroomInfo.floorId,
      },
    });
    const building: BuildingEntity = await this.buildingRepo.findOne({
      where: {
        id: floor.buildingId,
      },
    });

    const city: CityEntity = await this.cityRepo.findOne({
      where: {
        id: building.cityId,
      },
    });
    const province: ProvinceEntity = await this.provinceRepo.findOne({
      where: {
        id: city.provinceId,
      },
    });

    const region: RegionEntity = await this.regionRepo.findOne({
      where: {
        id: province.regionId,
      },
    });
    title =
      building.name +
      '-' +
      floor.floor +
      '-' +
      gender +
      ' ' +
      city.name +
      ', ' +
      province.name +
      ', ' +
      region.name;

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
    var rating: number = 0;
    var ratingCount: number = 0;
    const commentsIds: number[] = [];
    var totalComments: number = 0;

    const comments: CommentEntity[] = await this.commentRepo.find({
      where: {
        restroomId: id,
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
    restroomDetail.building = building.name;
    restroomDetail.floor = floor.floor;
    restroomDetail.location = restroomInfo.description;
    restroomDetail.rating = rating;
    restroomDetail.tags = tagnames;
    restroomDetail.locationImageIds = locationImageIds;
    restroomDetail.restroomImageIds = restroomImageIds;
    restroomDetail.commentsIds = commentsIds;
    restroomDetail.totalComments = totalComments;
    restroomDetail.gender = restroomInfo.gender;
    restroomDetail.createdByUser = createdByUser.username;
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
          name: province,
        },
      },
    );

    const cityEntity: CityEntity = await this.cityRepo.findOne({
      where: {
        name: city,
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

    for (const file of files.locationImages) {
      await saveImage(ImageType.LOCATION_IMG, file);
    }
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
    id: string,
    createRestroomReviewDto: CreateRestroomReviewDto,
  ): Promise<CreateRestroomReviewVo> {
    // TODO insert完需要再查出返回数据
    return null;
  }

  async updateRestroomReview(
    id: number,
    updateRestroomReviewDto: UpdateRestroomReviewDto,
  ): Promise<UpdateRestroomReviewVo> {
    // TODO

    return null;
  }

  async deleteRestroomReview(id): Promise<DeleteResult> {
    // FIXME FK问题
    return this.restroomRepo.delete({ id });
  }

  async changeVoteStatus(
    id: number,
    newStatus: number,
  ): Promise<ChangeVoteStatusVo> {
    // TODO 改完再select出来
    this.voteRepo.update(id, { type: VoteType.DOWNVOTE }); // fix this

    return null;
  }

  async getAdminReportList(): Promise<GetAdminReportListVo> {
    return null;
  }
}

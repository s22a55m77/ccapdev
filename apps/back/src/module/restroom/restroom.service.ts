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
import { GenderType, RestroomEntity } from '../../model/restroom.entity';
import { ChangeVoteStatusVo } from './vo/change-vote-status.vo';
import { GetAdminReportListVo } from './vo/get-admin-report-list.vo';
import { VoteEntity, VoteType } from 'src/model/vote.entity';
import { ProvinceEntity } from 'src/model/province.entity';
import { CityEntity } from 'src/model/city.entity';

@Injectable()
export class RestroomService {
  constructor(
    @InjectRepository(RestroomEntity)
    private readonly restroomRepo: Repository<RestroomEntity>,
    @InjectRepository(RegionEntity)
    private readonly regionRepo: Repository<RegionEntity>,
    @InjectRepository(TagEntity)
    private readonly tagRepo: Repository<TagEntity>,
    @InjectRepository(ImageEntity)
    private readonly imageRepo: Repository<ImageEntity>,
    @InjectRepository(BuildingEntity)
    private readonly buildingRepo: Repository<BuildingEntity>,
    @InjectRepository(FloorEntity)
    private readonly floorRepo: Repository<FloorEntity>,
    @InjectRepository(CommentEntity)
    private readonly commentRepo: Repository<CommentEntity>,
    @InjectRepository(VoteEntity)
    private readonly voteRepo: Repository<VoteEntity>,
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
    const floor: FloorEntity = restroomInfo.floor;
    const building: BuildingEntity = restroomInfo.floor.building;
    const city: CityEntity = building.city;
    const province: ProvinceEntity = city.province;
    const region: RegionEntity = province.region;
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
    restroomInfo.images.forEach((image) => {
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
    restroomInfo.comments.forEach((comment) => {
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
    rating = rating / ratingCount;

    const restroomDetail = new GetRestroomDetailVo();
    restroomDetail.id = restroomInfo.id;
    restroomDetail.title = title;
    restroomDetail.building = restroomInfo.floor.building.name;
    restroomDetail.floor = restroomInfo.floor.floor;
    restroomDetail.location = restroomInfo.description;
    restroomDetail.rating = rating;
    restroomDetail.tags = restroomInfo.tags.map((tag) => tag.tag.name);
    restroomDetail.locationImageIds = locationImageIds;
    restroomDetail.restroomImageIds = restroomImageIds;
    restroomDetail.commentsIds = commentsIds;
    restroomDetail.totalComments = totalComments;
    restroomDetail.gender = restroomInfo.gender;
    restroomDetail.createdByUser = restroomInfo.createdBy.username;
    restroomDetail.createdAt = restroomInfo.createdAt.toDateString();

    return restroomDetail;
  }

  async createRestroom(
    createRestroomDto: CreateRestroomDto,
    files: {
      locationImages: Express.Multer.File[];
      restroomImages: Express.Multer.File[];
    },
  ): Promise<CreateRestroomVo> {
    // TODO 需要insert到多个table
    return null;
  }

  async createRestroomReview(
    id: string,
    createRestroomReviewDto: CreateRestroomReviewDto,
  ): Promise<CreateRestroomReviewVo> {
    // TODO insert完需要再查出返回数据
    return null;
  }

  async updateRestroomReview(
    id: string,
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

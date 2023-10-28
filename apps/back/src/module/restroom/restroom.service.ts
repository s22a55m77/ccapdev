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
import { ImageEntity } from '../../model/image.entity';
import { BuildingEntity } from '../../model/building.entity';
import { FloorEntity } from '../../model/floor.entity';
import { CreateRestroomVo } from './vo/create-restroom.vo';
import { CreateRestroomReviewVo } from './vo/create-restroom-review.vo';
import { CreateRestroomReviewDto } from './dto/create-restroom-review.dto';
import { CommentEntity } from '../../model/comment.entity';
import { UpdateRestroomReviewDto } from './dto/update-restroom-review.dto';
import { UpdateRestroomReviewVo } from './vo/update-restroom-review.vo';
import { RestroomEntity } from '../../model/restroom.entity';
import { ChangeVoteStatusVo } from './vo/change-vote-status.vo';
import { GetAdminReportListVo } from './vo/get-admin-report-list.vo';

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
    id: string,
  ): Promise<GetRestroomDetailVo | null> {
    // TODO

    return null;
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

  async changeVoteStatus(id, newStatus): Promise<ChangeVoteStatusVo> {
    // TODO 改完再select出来
    return null;
  }

  async getAdminReportList(): Promise<GetAdminReportListVo> {
    return null;
  }
}

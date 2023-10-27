import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegionEntity } from '../../model/region.entity';
import { Repository } from 'typeorm';
import { addKeyFromExistingField, renameKey } from '../../common/utils';
import {
  FilterDataType,
  GetFilterOptionsVo,
} from './vo/get-filter-options.vo';
import { TagEntity } from '../../model/tag.entity';

@Injectable()
export class RestroomService {
  constructor(
    @InjectRepository(RegionEntity)
    private readonly regionRepo: Repository<RegionEntity>,
    @InjectRepository(TagEntity)
    private readonly tagRepo: Repository<TagEntity>,
  ) {}

  async getFilterOptions(): Promise<GetFilterOptionsVo> {
    // TODO add building and floor
    let location: FilterDataType[] = await this.regionRepo
      .createQueryBuilder('region')
      .select(['region.name', 'provinces.name', 'cities.name'])
      .leftJoin('region.provinces', 'provinces')
      .leftJoin('provinces.cities', 'cities')
      .orderBy('region.name, provinces.name, cities.name', 'ASC')
      .getMany()
      // FIXME type casting
      .then((res) => res as unknown as FilterDataType[]);

    location = renameKey(location, 'label', 'name');
    location = addKeyFromExistingField(location, 'value', 'label');
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
}

import { GenderType } from 'src/model/restroom.entity';

export class CreateRestroomDto {
  location: string;
  region: string;
  province: string;
  city: string;
  building: string;
  floor: number;
  gender: GenderType;
  tags: string[];
}

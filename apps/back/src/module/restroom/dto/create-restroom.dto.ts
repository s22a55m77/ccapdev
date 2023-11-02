import { GenderType } from 'src/model/restroom.entity';

export class CreateRestroomDto {
  location: string;
  region: number;
  province: number;
  city: number;
  building: string;
  floor: number;
  gender: GenderType;
  tags: string; // front use JSON.stringify, original type is string[]
}

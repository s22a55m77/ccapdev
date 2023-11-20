import {
  IsEnum,
  IsIn,
  IsInt,
  IsNumber,
  IsNumberString,
  IsString,
} from 'class-validator';
import { GenderType } from 'src/model/restroom.entity';

export class CreateRestroomDto {
  @IsString()
  location: string;
  @IsNumberString()
  region: number;
  @IsNumberString()
  province: number;
  @IsNumberString()
  city: number;
  @IsString()
  building: string;
  @IsNumberString()
  floor: number;
  @IsIn(['male', 'female'])
  gender: GenderType;
  @IsString()
  tags: string; // front use JSON.stringify, original type is string[]
}

import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class GetRestroomListQueryDto {
  @IsOptional()
  @IsString()
  region?: string;

  @IsOptional()
  @IsString()
  province?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  building?: string;

  @IsOptional()
  @IsString()
  sort?: 'RATING' | 'NEW';

  @IsOptional()
  @IsString()
  floor?: string;

  @IsOptional()
  @IsString()
  gender?: 'MALE' | 'FEMALE';

  @IsOptional()
  @IsString()
  availability?: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  current: number;

  @IsNotEmpty()
  @IsNumber()
  @Max(50)
  @Type(() => Number)
  pageSize: number;
}

import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateRestroomReviewDto {
  @IsOptional()
  @Min(0)
  @Max(5)
  @IsInt()
  rating?: number;

  @IsOptional()
  @IsNumber()
  commentTo?: number;

  @IsString()
  content: string;
}

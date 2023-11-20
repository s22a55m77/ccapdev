import { IsString } from 'class-validator';

export class UpdateRestroomReviewDto {
  @IsString()
  commentId: string;
  @IsString()
  content: string;
}

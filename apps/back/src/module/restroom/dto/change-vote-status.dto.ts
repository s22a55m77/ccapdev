import { IsIn, IsString } from 'class-validator';

export class ChangeVoteStatusDto {
  @IsIn([0, 1, 2])
  newStatus: number; // 0-none, 1-upvote, 2-downvote
  @IsString()
  commentId: string;
}

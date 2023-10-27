export class ChangeVoteStatusDto {
  newStatus: number; // 0-none, 1-upvote, 2-downvote
  commentId: string;
}

export class UpdateRestroomReviewVo {
  id: number;
  content: string;
  rating?: number;
  commentTo?: number; // comment ID to which it comments to
  commentToUser?: string; // username
  commentToUserId?: number;
  commentByUserId: number; // userId
  commentBy?: string; // username
  commentAt: string; // date
  downVote: number;
  upVote: number;
  isUpVoted: boolean;
  isDownVoted: boolean;
  isAdmin: boolean;
  childComments: number[];
}

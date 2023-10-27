export class ChangeVoteStatusVo {
  id: string;
  content: string;
  rating?: number;
  commentTo?: string; // comment ID to which it comments to
  commentToUser?: string; // username
  commentToUserId?: string;
  commentByUserId: string; // userId
  commentBy?: string; // username
  commentAt: string; // date
  downVote: number;
  upVote: number;
  isUpVoted: boolean;
  isDownVoted: boolean;
  isAdmin: boolean;
  childComments: string[];
}

declare namespace API {
  interface BaseResponse<Data> {
    error?: string;
    msg?: string;
    data: Data;
  }

  type LoginParams = {
    username: string;
    password: string;
  };

  type LoginData = {
    token: string;
  };

  type LoginResponse = BaseResponse<LoginData>;

  type RegisterParams = {
    username: string;
    password: string;
  };

  type RegisterData = {
    token: string;
  };

  type RegisterResponse = BaseResponse<RegisterData>;

  type UserData = {
    id: string;
    username;
    reviews: number;
    yearsInDLSU: number;
    description: string;
    role: 'USER' | 'ADMIN';
  };

  type MeResponse = BaseResponse<UserData>;

  type RefreshTokenData = {
    token: string;
  };

  type RefreshTokenResponse = BaseResponse<RefreshTokenData>;

  type UpdateUserProfileParams = {
    yearsInDLSU?: number;
    description?: string;
  };

  type UpdateUserProfileResponse = BaseResponse<UserData>;

  type RestroomList = Omit<
    RestroomData,
    'locationImageIds' | 'commentsIds' | 'isDownVoted' | 'isUpVoted'
  >;

  type RestroomListData = RestroomList[];

  type RestroomListQuery = {
    building?: string;
    sort: 'RATING' | 'NEW';
    floor?: number;
  };

  type RestroomListResponse = BaseResponse<RestroomListData>;

  type RestroomData = {
    id: string;
    title: string;
    building: string;
    floor: number;
    location: string; // location detail
    rating: number;
    tags: string[];
    locationImageIds: string[];
    restroomImageIds: string[];
    commentsIds: string[];
    totalComments: number;
    gender: 'MALE' | 'FEMALE';
    createdByUser: string;
    createdAt: string;
    downVote: number;
    upVote: number;
    isUpVoted: boolean;
    isDownVoted: boolean;
  };

  type RestroomDetailResponse = BaseResponse<RestroomData>;

  type CreateRestroomParams = {
    location: string;
    locationImageIds: string[];
    restroomImageIds: string[];
    building: string;
    floor: number;
    gender: 'MALE' | 'FEMALE';
    tags: string[];
  };

  type CreateRestroomResponse = BaseResponse<RestroomData>;

  type RateRestroomParams = {
    restroomId: string;
    rating: number;
  };

  type RateRestroomResponse = BaseResponse<RestroomData>;

  type UpdateProfilePicData = {
    id: string;
  };

  type UpdateProfilePicResponse = BaseResponse<UpdateProfilePicData>;

  type CreateRestroomReviewParams = {
    restroomId: string;
    commentTo: string | null; // comment ID to which it comments to
    content: string;
  };

  type CreateRestroomReviewResponse = BaseResponse<RestroomData>;

  type UpdateRestroomReviewParams = {
    restroomId: string;
    commentId: string;
    content: string;
  };

  type ChangeVoteStatusParams = {
    newStatus: number; // 0-none, 1-upvote, 2-downvote
    commentId: string;
  };

  type DeleteRestroomReviewResponse = BaseResponse<RestroomData>;

  type ChangeVoteStatusResponse = BaseResponse<RestroomData>;

  type ChangeRestroomStatusParams = {
    newStatus: number;
    restroomId: string;
  };

  type AdminRestroomData = Omit<
    RestroomData,
    | 'commentsIds'
    | 'totalComments'
    | 'upVote'
    | 'downVote'
    | 'rating'
    | 'tags'
    | 'isUpVoted'
    | 'isDownVoted'
  > & { status: number };
  type ChangeRestroomStatusResponse = BaseResponse<AdminRestroomData>;

  type CommentDetailData = {
    id: string;
    content: string;
    commentTo?: string; // comment ID to which it comments to
    commentToUser?: string; // username
    commentByUserId: string; // userId
    commentBy?: string; // username
    commentAt: string; // date
    downVote: number;
    upVote: number;
    isUpVoted: boolean;
    isDownVoted: boolean;
    childComments: string[];
  };

  type GetCommentDetailResponse = BaseResponse<CommentDetailData>;
}

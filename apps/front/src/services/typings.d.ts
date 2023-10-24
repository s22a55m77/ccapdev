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
    email: string;
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
    dateRegistered: number;
    description: string;
    role: 'USER' | 'ADMIN';
    profilePicId: string;
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

  type UpdateUserProfileResponse = BaseResponse<UserProfileData>;

  type RestroomList = Omit<
    RestroomData,
    'locationImageIds' | 'commentsIds' | 'isDownVoted' | 'isUpVoted'
  >;

  type RestroomListData = RestroomList[];

  type RestroomListQuery = {
    region?: string;
    province?: string;
    city?: string;
    building?: string;
    sort: 'RATING' | 'NEW';
    floor?: string;
    gender?: 'MALE' | 'FEMALE';
    availability?: string;
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
    locationImages: FileList[];
    restroomImages: FileList[];
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
    rating?: number;
    restroomId: string;
    commentTo?: string; // comment ID to which it comments to
    content?: string;
  };

  type CreateRestroomReviewResponse = BaseResponse<CommentDetailData>;

  type UpdateRestroomReviewParams = {
    restroomId: string;
    commentId: string;
    content: string;
  };

  type UpdateRestroomReviewResponse = BaseResponse<CommentDetailData>;

  type ChangeVoteStatusParams = {
    newStatus: number; // 0-none, 1-upvote, 2-downvote
    commentId: string;
  };

  type DeleteRestroomReviewResponse = BaseResponse<RestroomData>;

  type ChangeVoteStatusResponse = BaseResponse<CommentDetailData>;

  type ChangeRestroomStatusParams = {
    newStatus: number; // 0-disapproved, 1-approved, 2-pending
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
  };

  type GetCommentDetailResponse = BaseResponse<CommentDetailData>;

  type VoteRestroomParams = {
    restroomId: string;
    upVote?: boolean;
    downVote?: boolean;
  };

  type VoteRestroomResponse = BaseResponse<RestroomData>;

  type AdminRestroomList = {
    id: string;
    title: string;
    building: string;
    floor: number;
    status: number;
  };

  type AdminRestroomListData = AdminRestroomList[];

  type GetAdminRestroomListResponse = BaseResponse<AdminRestroomListData>;

  type GetAdminRestroomDetailResponse = BaseResponse<AdminRestroomData>;

  type UserHistory = {
    id: string;
    title: string;
    content: string;
    rating?: number;
    commentTo?: string; // comment ID to which it comments to
    commentToUser?: string; // username
    commentByUserId: string; // userId
    commentBy?: string; // username
    type: 'Reply' | 'Submit' | 'Review';
  };

  type UserProfileData = UserData & {
    history: UserHistory[];
  };

  type GetUserProfileResponse = BaseResponse<UserProfileData>;
}

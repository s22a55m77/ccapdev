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
    id: number;
    username;
    reviews: number;
    dateRegistered: number;
    description: string;
    role: 'user' | 'admin';
    profilePicId: number;
  };

  type MeResponse = BaseResponse<UserData>;

  type RefreshTokenData = {
    token: string;
  };

  type RefreshTokenResponse = BaseResponse<RefreshTokenData>;

  type UpdateUserProfileParams = {
    dateRegistered?: Date;
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
    id: number;
    restroomId: number;
    title: string;
    building: string;
    floor: number;
    location: string; // location detail
    rating: number;
    tags: string[];
    locationImageIds: number[];
    restroomImageIds: number[];
    commentsIds: number[];
    totalComments: number;
    gender: 'MALE' | 'FEMALE';
    createdByUser: string;
    createdByUserId: number;
    createdAt: string;
  };

  type RestroomDetailResponse = BaseResponse<RestroomData>;

  type CreateRestroomParams = {
    location: string;
    locationImages: FileList;
    restroomImages: FileList;
    region: number;
    province: number;
    city: number;
    building: string;
    floor: number;
    gender: 'male' | 'female';
    tags: string[];
  };

  type CreateRestroomResponse = BaseResponse<RestroomData>;

  type RateRestroomParams = {
    restroomId: number;
    rating: number;
  };

  type RateRestroomResponse = BaseResponse<RestroomData>;

  type UpdateProfilePicResponse = BaseResponse<UserProfileData>;

  type CreateRestroomReviewParams = {
    rating?: number;
    restroomId: number;
    commentTo?: number; // comment ID to which it comments to
    content?: string;
  };

  type CreateRestroomReviewResponse = BaseResponse<CommentDetailData>;

  type UpdateRestroomReviewParams = {
    restroomId: number;
    commentId: number;
    content: string;
  };

  type UpdateRestroomReviewResponse = BaseResponse<CommentDetailData>;

  type ChangeVoteStatusParams = {
    newStatus: number; // 0-none, 1-upvote, 2-downvote
    commentId: number;
  };

  type DeleteRestroomReviewResponse = BaseResponse<RestroomData>;

  type ChangeVoteStatusResponse = BaseResponse<CommentDetailData>;

  type ChangeReportStatusParams = {
    newStatus: number; // 0-remove, 1-reject
    reportId: number;
  };

  type AdminReportData = Omit<
    RestroomData,
    | 'commentsIds'
    | 'totalComments'
    | 'upVote'
    | 'downVote'
    | 'rating'
    | 'tags'
  > & { status: string };
  type ChangeRestroomStatusResponse = BaseResponse<AdminReportData>;

  type CommentDetailData = {
    id: number;
    content: string;
    rating?: number;
    commentTo?: string; // comment ID to which it comments to
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
  };

  type GetCommentDetailResponse = BaseResponse<CommentDetailData>;

  type VoteRestroomParams = {
    restroomId: number;
    upVote?: boolean;
    downVote?: boolean;
  };

  type VoteRestroomResponse = BaseResponse<RestroomData>;

  type AdminReportList = {
    id: number;
    title: string;
    region: string;
    province: string;
    city: string;
    building: string;
    floor: number;
    status: number;
  };

  type AdminReportListData = AdminReportList[];

  type GetAdminReportListResponse = BaseResponse<AdminReportListData>;

  type GetAdminReportDetailResponse = BaseResponse<AdminReportData>;

  type UserHistory = {
    id: number;
    title: string;
    content: string;
    rating?: number;
    commentTo?: string; // comment ID to which it comments to
    commentToUser?: string; // username
    commentByUserId: number; // userId
    commentBy?: string; // username
    type: 'Reply' | 'Submit' | 'Review';
  };

  type UserProfileData = UserData & {
    history: UserHistory[];
  };

  type GetUserProfileResponse = BaseResponse<UserProfileData>;

  type FilterDataType = {
    label: string;
    value: number | string;
    children?: FilterDataType[];
  };

  type GetFilterOptionsData = {
    location: FilterDataType[];
    gender: FilterDataType[];
    availability: FilterDataType[];
  };

  type GetFilterOptionsResponse = BaseResponse<GetFilterOptionsData>;

  type ReportRestroomParam = {
    id: number;
  };

  type ReportRestroomData = {
    success: boolean;
  };

  type ReportRestroomResponse = BaseResponse<ReportRestroomData>;
}

declare namespace API {
  interface BaseResponse<Data> {
    error: string | null;
    msg: string | null;
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

  interface RestroomList
    extends Omit<RestroomData, 'locationImageIds' | 'commentsIds'> {
    totalComments: number;
  }

  type RestroomListData = RestroomList[];

  type RestroomListQuery = {
    building?: string;
    rating?: 'ASC' | 'DESC';
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
    gender: 'MALE' | 'FEMALE';
    createdByUser: string;
    createdAt: string;
    downVote: number;
    upVote: number;
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
}
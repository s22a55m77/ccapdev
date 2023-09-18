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
}

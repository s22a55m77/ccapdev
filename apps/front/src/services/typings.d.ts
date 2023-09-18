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
}

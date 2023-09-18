import * as MockAdapter from 'axios-mock-adapter';

function createResponse<Data>(
  data: Data,
  msg?: string | null,
  error?: string,
): API.BaseResponse<Data> {
  return {
    error: error ?? null,
    msg: msg ?? null,
    data: data,
  };
}

export default function configureMock(mock: MockAdapter) {
  // POST /auth/login
  mock.onPost('/auth/login').reply(
    200,
    createResponse<API.LoginData>({
      token: 'this is the token',
    }),
  );

  // POST /auth/register
  mock.onPost('/auth/register').reply(
    200,
    createResponse<API.RegisterData>({
      token: 'this is the token',
    }),
  );

  // GET /auth/me
  mock.onGet('/auth/me').reply(
    200,
    createResponse<API.UserData>({
      id: '1',
      reviews: 1,
      yearsInDLSU: 1,
      description: 'this is a short description',
    }),
  );

  // GET /auth/refresh
  mock.onGet('/auth/refresh').reply(
    200,
    createResponse<API.RefreshTokenData>({
      token: 'this is the new token',
    }),
  );

  //PATCH /user/profile
  mock.onPatch('/user/profile').reply(
    200,
    createResponse<API.UserData>({
      id: '1',
      reviews: 1,
      yearsInDLSU: 2,
      description: 'this is the new description',
    }),
  );
}

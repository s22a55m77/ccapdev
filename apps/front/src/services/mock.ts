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
    createResponse({
      token: 'this is the token',
    }),
  );
}

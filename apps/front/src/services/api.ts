import APIClient from './APIClient.ts';

// POST /auth/login
export function login({
  username,
  password,
}: API.LoginParams): Promise<API.LoginData> {
  return APIClient.post<API.LoginResponse>('/auth/login', {
    username,
    password,
  }).then((res) => res.data.data);
}

// POST /auth/register
export function register({
  username,
  password,
}: API.RegisterParams): Promise<API.RegisterData> {
  return APIClient.post<API.RegisterResponse>('/auth/register', {
    username,
    password,
  }).then((res) => res.data.data);
}

//GET /auth/me
export function me(): Promise<API.UserData> {
  return APIClient.get<API.MeResponse>('/auth/me', {
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  }).then((res) => res.data.data);
}

//GET /auth/refresh
export function refreshToken(): Promise<API.RefreshTokenData> {
  return APIClient.get<API.RefreshTokenResponse>('/auth/refresh', {
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  }).then((res) => res.data.data);
}

//PATCH /user/profile
export function updateUserProfile({
  yearsInDLSU,
  description,
}: API.UpdateUserProfileParams) {
  return APIClient.patch<API.UpdateUserProfileResponse>(
    '/user/profile',
    {
      yearsInDLSU,
      description,
    },
    {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    },
  ).then((res) => res.data.data);
}

//TODO GET /user/profile/pic

//TODO PATCH /user/profile/pic

//TODO GET /restroom
// query building
// query floor
// query sort

//TODO GET /restroom/:id

//TODO POST /restroom

//TODO POST /restroom/rate



// TODO POST /restroom/review

// TODO PATCH /restroom/review/update

// TODO DELETE / restroom/review/delete

// TODO POST /restroom/comment

// TODO PATCH /restroom/comment/update

// TODO DELETE /restroom/comment/delete

// TODO POST /restroom/comment/vote

// TODO GET /

import APIClient from './APIClient.ts';

// POST /auth/login
export function login({
  username,
  password,
}: API.LoginParams): Promise<API.LoginData> {
  return APIClient.post<API.LoginResponse>(
    '/auth/login',
    {
      username,
      password,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  ).then((res) => {
    localStorage.setItem('token', res.data.data.token);
    return res.data.data;
  });
}

export function logout(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('lastLoginTime');
}

// POST /auth/register
export function register({
  username,
  email,
  password,
}: API.RegisterParams): Promise<API.RegisterData> {
  return APIClient.post<API.RegisterResponse>(
    '/auth/register',
    {
      username,
      password,
      email,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  ).then((res) => {
    localStorage.setItem('token', res.data.data.token);
    return res.data.data;
  });
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
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    },
  ).then((res) => res.data.data);
}

// PATCH /user/profile/pic
export function updateProfilePic(
  file: File,
): Promise<API.UpdateProfilePicData> {
  return APIClient.patch<API.UpdateProfilePicResponse>(
    '/user/profile/pic',
    { file },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: localStorage.getItem('token'),
      },
    },
  ).then((res) => res.data.data);
}

// GET /user/:id/profile
export function getUserProfile(id: string): Promise<API.UserProfileData> {
  return APIClient.get<API.GetUserProfileResponse>(
    `/user/${id}/profile`,
  ).then((res) => res.data.data);
}

// GET /restroom/filter
export function getFilterOptions(): Promise<API.GetFilterOptionsData> {
  return APIClient.get<API.GetFilterOptionsResponse>(
    '/restroom/filter',
  ).then((res) => res.data.data);
}

// GET /restroom
// query building
// query floor
// query sort
export function getRestroomList({
  region,
  province,
  city,
  building,
  floor,
  gender,
  availability,
  sort,
}: API.RestroomListQuery): Promise<API.RestroomListData> {
  return APIClient.get<API.RestroomListResponse>('/restroom', {
    params: {
      region,
      province,
      city,
      building,
      floor,
      gender,
      availability,
      sort,
    },
  }).then((res) => res.data.data);
}

// GET /restroom/:id
export function getRestroomDetail(id: string): Promise<API.RestroomData> {
  return APIClient.get<API.RestroomDetailResponse>(`/restroom/${id}`, {
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  }).then((res) => res.data.data);
}

// POST /restroom
export function createRestroom({
  location,
  locationImages,
  restroomImages,
  building,
  floor,
  gender,
  tags,
}: API.CreateRestroomParams): Promise<API.RestroomData> {
  // TODO need test on MCO2
  return APIClient.post<API.CreateRestroomResponse>(
    '/restroom',
    {
      location,
      building,
      floor,
      gender,
      tags,
      locationImages,
      restroomImages,
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: localStorage.getItem('token'),
      },
    },
  ).then((res) => res.data.data);
}

// POST /restroom/:id/review
export function createRestroomReview({
  rating,
  restroomId,
  commentTo,
  content,
}: API.CreateRestroomReviewParams): Promise<API.CommentDetailData> {
  return APIClient.post<API.CreateRestroomReviewResponse>(
    `/restroom/${restroomId}/review`,
    {
      rating,
      commentTo,
      content,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    },
  ).then((res) => res.data.data);
}

// POST /restroom/:id/vote
export function voteRestroom({
  restroomId,
  upVote,
  downVote,
}: API.VoteRestroomParams): Promise<API.RestroomData> {
  return APIClient.post<API.VoteRestroomResponse>(
    `/restroom/${restroomId}/vote`,
    {
      upVote,
      downVote,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    },
  ).then((res) => res.data.data);
}

// PATCH /restroom/:id/review
export function updateRestroomReview({
  restroomId,
  commentId,
  content,
}: API.UpdateRestroomReviewParams): Promise<API.CommentDetailData> {
  return APIClient.patch<API.UpdateRestroomReviewResponse>(
    `/restroom/${restroomId}/review`,
    {
      commentId,
      content,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    },
  ).then((res) => res.data.data);
}

// DELETE / restroom/:id/review/
export function deleteRestroomReview(
  restroomId: string,
): Promise<API.RestroomData> {
  return APIClient.delete<API.DeleteRestroomReviewResponse>(
    `/restroom/${restroomId}/review`,
    {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    },
  ).then((res) => res.data.data);
}

// POST /restroom/review/:id/vote
export function changeVoteStatus({
  newStatus,
  commentId,
}: API.ChangeVoteStatusParams): Promise<API.CommentDetailData> {
  return APIClient.post<API.ChangeVoteStatusResponse>(
    `/restroom/review/${commentId}/vote`,
    {
      status: newStatus,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    },
  ).then((res) => res.data.data);
}

// admin

// GET /restroom/creation
export function getAdminRestroomsList(): Promise<API.AdminRestroomListData> {
  return APIClient.get<API.GetAdminRestroomListResponse>(
    '/restroom/creation',
    {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    },
  ).then((res) => res.data.data);
}

// GET  /restroom/creation/:id >> review restroom creation
export function getRestroomCreationInfo(
  id: string,
): Promise<API.AdminRestroomData> {
  return APIClient.get<API.GetAdminRestroomDetailResponse>(
    `/restroom/creation/${id}`,
    {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    },
  ).then((res) => res.data.data);
}

// POST /restroom/creation/:id/status   >> handle restroom creation(approve, reject, delete)
export function changeRestroomStatus({
  newStatus,
  restroomId,
}: API.ChangeRestroomStatusParams): Promise<API.AdminRestroomData> {
  return APIClient.post<API.ChangeRestroomStatusResponse>(
    `/restroom/creation/${restroomId}/status`,
    {
      status: newStatus,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    },
  ).then((res) => res.data.data);
}

// GET /comment/:id
export function getCommentDetail(
  id: string,
): Promise<API.CommentDetailData> {
  return APIClient.get<API.GetCommentDetailResponse>(`/comment/${id}`, {
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  }).then((res) => res.data.data);
}

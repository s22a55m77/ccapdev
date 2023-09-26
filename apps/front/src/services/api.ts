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

// GET /restroom
// query building
// query floor
// query sort
export function getRestroomList({
  building,
  sort,
  floor,
}: API.RestroomListQuery): Promise<API.RestroomListData> {
  return APIClient.get<API.RestroomListResponse>('/restroom', {
    params: {
      building,
      sort,
      floor,
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
  locationImageIds,
  restroomImageIds,
  building,
  floor,
  gender,
  tags,
}: API.CreateRestroomParams): Promise<API.RestroomData> {
  return APIClient.post<API.CreateRestroomResponse>('/restroom', {
    location,
    locationImageIds,
    restroomImageIds,
    building,
    floor,
    gender,
    tags,
  }).then((res) => res.data.data);
}

// POST /restroom/:id/review
export function createRestroomReview({
  rating,
  restroomId,
  commentTo,
  content,
}: API.CreateRestroomReviewParams): Promise<API.RestroomData> {
  return APIClient.post<API.CreateRestroomReviewResponse>(
    `/restroom/${restroomId}/review`,
    {
      rating,
      commentTo,
      content,
    },
    {
      headers: {
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
}: API.VoteRestroomParams) {
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
  );
}

// PATCH /restroom/:id/review
export function updateRestroomReview({
  restroomId,
  commentId,
  content,
}: API.UpdateRestroomReviewParams): Promise<API.RestroomData> {
  return APIClient.patch<API.CreateRestroomReviewResponse>(
    `/restroom/${restroomId}/review`,
    {
      commentId,
      content,
    },
    {
      headers: {
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
}: API.ChangeVoteStatusParams): Promise<API.RestroomData> {
  return APIClient.post<API.ChangeVoteStatusResponse>(
    `/restroom/review/${commentId}/vote`,
    {
      status: newStatus,
    },
    {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    },
  ).then((res) => res.data.data);
}

// admin

// GET  /restroom/creation/:id >> review restroom creation
export function getRestroomCreationInfo(
  id: string,
): Promise<API.RestroomData> {
  return APIClient.get<API.RestroomDetailResponse>(
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

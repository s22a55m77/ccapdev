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
  rating,
  floor,
}: API.RestroomListQuery): Promise<API.RestroomListData> {
  return APIClient.get<API.RestroomListResponse>('/restroom', {
    params: {
      building,
      rating,
      floor,
    },
  }).then((res) => res.data.data);
}

// GET /restroom/:id
export function getRestroomDetail(id: string): Promise<API.RestroomData> {
  return APIClient.get<API.RestroomDetailResponse>(`/restroom/${id}`).then(
    (res) => res.data.data,
  );
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

// POST /restroom/rate
export function rateRestroom({
  restroomId,
  rating,
}: API.RateRestroomParams): Promise<API.RestroomData> {
  return APIClient.post<API.RateRestroomResponse>('/restroom/rate', {
    restroomId,
    rating,
  }).then((res) => res.data.data);
}

// TODO POST /restroom/review
export function createRestroomReview({
  restroomId,
  commentTo,
  content,
}: API.CreateRestroomReviewParams): Promise<API.RestroomData> {
  return APIClient.post<API.CreateRestroomReviewResponse>('/restroom/review', {
    restroomId,
    commentTo,
    content,
  }).then((res) => res.data.data);
}

// TODO PATCH /restroom/review
export function updateRestroomReview({
  commentId,
  content,
}: API.UpdateRestroomReviewParams): Promise<API.RestroomData> {
  return APIClient.patch<API.CreateRestroomReviewResponse>('/restroom/review', {
    commentId,
    content,
  }).then((res) => res.data.data);
}

// TODO DELETE / restroom/review/${commentId}
export function deleteRestroomReview(commentId: string): Promise<void> {
  return APIClient.delete(`/restroom/review/${commentId}`)
    .then((res) => {
      if (res.status !== 200) {
        throw new Error('Failed to delete the review.');
      }
    });
}

// TODO POST /restroom/review/vote
export function changeVoteStatus({
  newStatus,
  commentId,
}: API.ChangeVoteStatusParams): Promise<void> {
  return APIClient.delete(`/restroom/review?commentid=${commentId}&status=${newStatus}`)
    .then(() => {});     // TODO: return what?
}


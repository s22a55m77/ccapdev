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
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }).then((res) => res.data.data);
}

//GET /auth/refresh
export function refreshToken(): Promise<API.RefreshTokenData> {
  return APIClient.get<API.RefreshTokenResponse>('/auth/refresh', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }).then((res) => res.data.data);
}

//PATCH /user/profile
export function updateUserProfile({
  dateRegistered,
  description,
}: API.UpdateUserProfileParams) {
  return APIClient.patch<API.UpdateUserProfileResponse>(
    '/user/profile',
    {
      dateRegistered,
      description,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
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
        Authorization: `Bearer ${localStorage.getItem('token')}`,
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
      Authorization: `Bearer ${localStorage.getItem('token')}`,
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
        Authorization: `Bearer ${localStorage.getItem('token')}`,
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
        Authorization: `Bearer ${localStorage.getItem('token')}`,
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
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  ).then((res) => res.data.data);
}

// DELETE / restroom/:id/review/
export function deleteRestroomReview(
  restroomId: number,
): Promise<API.RestroomData> {
  return APIClient.delete<API.DeleteRestroomReviewResponse>(
    `/restroom/${restroomId}/review`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
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
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  ).then((res) => res.data.data);
}

export function reportRestroom({
  id,
}: API.ReportRestroomParam): Promise<API.ReportRestroomData> {
  return APIClient.post<API.ReportRestroomResponse>(
    `/report/${id}`,
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  ).then((res) => res.data.data);
}

// admin

// GET /report
export function getAdminReportList(): Promise<API.AdminReportListData> {
  return APIClient.get<API.GetAdminReportListResponse>('/report', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }).then((res) => res.data.data);
}

// GET  /report/:id
export function getReportDetail(id: string): Promise<API.AdminReportData> {
  return APIClient.get<API.GetAdminReportDetailResponse>(`/report/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }).then((res) => res.data.data);
}

// PATCH /report/:id
export function changeReportStatus({
  newStatus,
  reportId,
}: API.ChangeReportStatusParams): Promise<API.AdminReportData> {
  return APIClient.post<API.ChangeRestroomStatusResponse>(
    `/report/${reportId}`,
    {
      status: newStatus,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  ).then((res) => res.data.data);
}

// GET /comment/:id
export function getCommentDetail(
  id: number,
): Promise<API.CommentDetailData> {
  return APIClient.get<API.GetCommentDetailResponse>(`/comment/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }).then((res) => res.data.data);
}

export function getImage(id: number) {
  const baseURL = APIClient.defaults.baseURL;
  return `${baseURL}/restroom/${id}/image`;
}

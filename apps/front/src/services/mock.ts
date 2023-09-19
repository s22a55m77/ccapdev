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

  // GET /restroom
  // query building
  // query floor
  // query sort
  mock.onGet('/restroom').reply((config) => {
    let restrooms: API.RestroomListData = [
      {
        id: '1',
        title: 'Restroom 1',
        tags: ['tag1', 'tag2'],
        building: 'building 1',
        floor: 1,
        rating: 4,
        restroomImageIds: ['1'],
        gender: 'MALE',
      },
      {
        id: '2',
        title: 'Restroom 2',
        tags: ['tag1', 'tag2'],
        building: 'building 2',
        floor: 3,
        rating: 2,
        restroomImageIds: ['2'],
        gender: 'FEMALE',
      },
    ];

    if (config.params.building) {
      restrooms = restrooms.filter(
        (restroom) => restroom.building === config.params.building,
      );
    }

    if (config.params.floor) {
      restrooms = restrooms.filter(
        (restroom) => restroom.floor === config.params.floor,
      );
    }

    if (config.params.rating) {
      if (config.params.rating === 'ASC') {
        restrooms = restrooms.slice().sort((a, b) => a.rating - b.rating);
      }

      if (config.params.rating === 'DESC') {
        restrooms = restrooms.slice().sort((a, b) => b.rating - a.rating);
      }
    }

    const response: API.RestroomListResponse =
      createResponse<API.RestroomListData>(restrooms);

    return [200, response];
  });

  // GET /restroom/:id
  mock.onGet(/^\/restroom\/(\d+)$/).reply((config) => {
    let restrooms: API.RestroomData[] = [
      {
        id: '1',
        title: 'Restroom 1',
        tags: ['tag1', 'tag2'],
        building: 'building 1',
        floor: 1,
        rating: 4,
        restroomImageIds: ['1'],
        location: 'location description',
        locationImageIds: ['3'],
        commentsIds: ['1'],
        gender: 'MALE',
      },
      {
        id: '2',
        title: 'Restroom 2',
        tags: ['tag1', 'tag2'],
        building: 'building 2',
        floor: 3,
        rating: 2,
        restroomImageIds: ['2'],
        location: 'location description',
        locationImageIds: ['4'],
        commentsIds: ['2'],
        gender: 'FEMALE',
      },
    ];

    if (config.url) {
      const result = config.url.match(/^\/restroom\/(\d+)$/);
      if (result) {
        const id = result[0];

        const restroom = restrooms.filter(
          (restroom) => restroom.id === id,
        )[0];

        const response: API.RestroomDetailResponse =
          createResponse(restroom);

        return [200, response];
      }
    }

    return [400];
  });

  // POST /restroom
  mock.onPost('/restroom').reply((config) => {
    const restroom: API.RestroomData = {
      id: '100',
      title: `${config.data.building}-${config.data.floor} floor-${config.data.gender}`,
      building: config.data.building,
      floor: config.data.floor,
      location: config.data.location,
      rating: 2,
      tags: [],
      locationImageIds: config.data.locationImageIds,
      restroomImageIds: config.data.restroomImageIds,
      commentsIds: [],
      gender: config.data.gender,
    };

    const response: API.CreateRestroomResponse = createResponse(restroom);

    return [200, response];
  });

  // POST /restroom/rate
  mock.onPost('/restroom/rate').reply((config) => {
    let restrooms: API.RestroomData[] = [
      {
        id: '1',
        title: 'Restroom 1',
        tags: ['tag1', 'tag2'],
        building: 'building 1',
        floor: 1,
        rating: 4,
        restroomImageIds: ['1'],
        location: 'location description',
        locationImageIds: ['3'],
        commentsIds: ['1'],
        gender: 'MALE',
      },
      {
        id: '2',
        title: 'Restroom 2',
        tags: ['tag1', 'tag2'],
        building: 'building 2',
        floor: 3,
        rating: 2,
        restroomImageIds: ['2'],
        location: 'location description',
        locationImageIds: ['4'],
        commentsIds: ['2'],
        gender: 'FEMALE',
      },
    ];

    const restroom = restrooms.filter(
      (restroom) => restroom.id === config.data.restroomId,
    )[0];

    restroom.rating = config.data.rating;

    const response: API.RateRestroomResponse =
      createResponse<API.RestroomData>(restroom);

    return [200, response];
  });

  // PATCH /user/profile/pic
  mock.onPatch('/user/profile/pic').reply(
    200,
    createResponse<API.UpdateProfilePicData>({
      id: '1',
    }),
  );
}

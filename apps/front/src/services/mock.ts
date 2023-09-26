import * as MockAdapter from 'axios-mock-adapter';

function createResponse<Data>(
  data: Data,
  msg?: string,
  error?: string,
): API.BaseResponse<Data> {
  return {
    error: error,
    msg: msg,
    data: data,
  };
}

const user: API.UserData = {
  id: '1',
  username: 'user1',
  reviews: 1,
  yearsInDLSU: 1,
  description: 'this is a short description',
  role: 'ADMIN',
  profilePicId: '/src/assets/dlsu.jpg',
};

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
  mock.onGet('/auth/me').reply(200, createResponse<API.UserData>(user));

  // GET /auth/refresh
  mock.onGet('/auth/refresh').reply(
    200,
    createResponse<API.RefreshTokenData>({
      token: 'this is the new token',
    }),
  );

  //PATCH /user/profile
  mock.onPatch('/user/profile').reply((config) => {
    const data = JSON.parse(config.data);
    if (data.description) user.description = data.description;
    if (data.yearsInDLSU) user.yearsInDLSU = data.yearsInDLSU;
    return [200, createResponse<API.UserData>(user)];
  });

  // GET /restroom
  // query building
  // query floor
  // query sort
  mock.onGet('/restroom').reply((config) => {
    let restrooms: API.RestroomListData = [
      {
        id: '1',
        title: 'Gokongwei - 1st Floor - Male',
        tags: ['tag1', 'tag2'],
        building: 'Gokongwei',
        floor: 1,
        rating: 4,
        restroomImageIds: ['1'],
        gender: 'MALE',
        createdByUser: 'user1',
        createdAt: 'September 18, 2023',
        downVote: 1,
        upVote: 1,
        totalComments: 1,
        location: 'location description',
      },
      {
        id: '2',
        title: 'Razon - 3rd Floor - Female',
        tags: ['tag4', 'tag3'],
        building: 'Razon',
        floor: 3,
        rating: 2,
        restroomImageIds: ['2'],
        gender: 'FEMALE',
        createdByUser: 'user1',
        createdAt: 'September 19, 2023',
        downVote: 2,
        upVote: 2,
        totalComments: 1,
        location: 'location description',
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

    if (config.params.sort) {
      if (config.params.sort === 'RATING') {
        restrooms = restrooms.slice().sort((a, b) => b.rating - a.rating);
      }

      if (config.params.sort === 'NEW') {
        restrooms = restrooms.slice().sort((a, b) => {
          const dateA: Date = new Date(a.createdAt);
          const dateB: Date = new Date(b.createdAt);

          return dateB.valueOf() - dateA.valueOf();
        });
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
        title: 'Gokongwei - 1st Floor - Male',
        tags: ['tag1', 'tag2'],
        building: 'Gokongwei',
        floor: 1,
        rating: 4,
        restroomImageIds: ['1'],
        location: 'location description',
        locationImageIds: ['3'],
        commentsIds: ['1'],
        totalComments: 1,
        gender: 'MALE',
        createdByUser: 'user1',
        createdAt: 'September 18, 2023',
        downVote: 2,
        upVote: 2,
        isDownVoted: false,
        isUpVoted: true,
      },
      {
        id: '2',
        title: 'Razon - 3rd Floor - Female',
        tags: ['tag3', 'tag4'],
        building: 'Razon',
        floor: 3,
        rating: 2,
        restroomImageIds: ['2'],
        location: 'location description',
        locationImageIds: ['4'],
        commentsIds: ['1', '2'],
        totalComments: 1,
        gender: 'FEMALE',
        createdByUser: 'user1',
        createdAt: 'September 19, 2023',
        downVote: 2,
        upVote: 2,
        isDownVoted: false,
        isUpVoted: false,
      },
    ];

    if (config.url) {
      const result = config.url.match(/^\/restroom\/(\d+)$/);
      if (result) {
        const id = result[1];
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
      tags: config.data.tags,
      locationImageIds: config.data.locationImageIds,
      restroomImageIds: config.data.restroomImageIds,
      commentsIds: [],
      totalComments: 0,
      gender: config.data.gender,
      createdByUser: 'User1',
      createdAt: 'September 19, 2023',
      downVote: 2,
      upVote: 2,
      isDownVoted: false,
      isUpVoted: false,
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
        totalComments: 1,
        gender: 'MALE',
        createdByUser: 'user1',
        createdAt: 'September 19, 2023',
        downVote: 2,
        upVote: 2,
        isDownVoted: false,
        isUpVoted: true,
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
        commentsIds: ['1', '2'],
        totalComments: 1,
        gender: 'FEMALE',
        createdByUser: '1',
        createdAt: 'September 18, 2023',
        downVote: 2,
        upVote: 2,
        isDownVoted: false,
        isUpVoted: false,
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

  // GET comment/:id
  mock.onGet(/^\/comment\/(\d+)$/).reply((config) => {
    const comments: API.CommentDetailData[] = [
      {
        id: '1',
        content: 'first comment',
        commentByUserId: '1',
        commentBy: 'user1',
        commentAt: 'September 25, 2023',
        downVote: 0,
        upVote: 0,
        isDownVoted: false,
        isUpVoted: true,
        childComments: ['3'],
      },
      {
        id: '2',
        content: 'second comment',
        commentByUserId: '2',
        commentBy: 'user2',
        commentAt: 'September 25, 2023',
        downVote: 0,
        upVote: 0,
        isDownVoted: false,
        isUpVoted: false,
        childComments: [],
      },
      {
        id: '3',
        content: 'reply to first comment',
        commentByUserId: '3',
        commentBy: 'user3',
        commentAt: 'September 25, 2023',
        commentTo: '1',
        commentToUser: 'user1',
        downVote: 0,
        upVote: 0,
        isDownVoted: false,
        isUpVoted: false,
        childComments: [],
      },
    ];

    if (config.url) {
      const result = config.url.match(/^\/comment\/(\d+)$/);
      if (result) {
        const id = result[1];
        const comment = comments.filter((comment) => comment.id === id)[0];

        const response: API.GetCommentDetailResponse =
          createResponse(comment);

        return [200, response];
      }
    }

    return [400];
  });
}

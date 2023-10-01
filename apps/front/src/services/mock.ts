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

function getCurrentFormattedDate() {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const currentDate = new Date();
  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();

  const formattedDate = `${month} ${day}, ${year}`;
  return formattedDate;
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

let restrooms: API.RestroomData[] = [
  {
    id: '1',
    title: 'Gokongwei - 1st Floor - Male',
    tags: ['tag1', 'tag2'],
    building: 'Gokongwei',
    floor: 1,
    rating: 4,
    restroomImageIds: ['/src/assets/toilet.png'],
    location: 'location description',
    locationImageIds: ['/src/assets/toilet.png'],
    commentsIds: ['1'],
    totalComments: 1,
    gender: 'MALE' as 'FEMALE' | 'MALE',
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
    restroomImageIds: [
      '/src/assets/toilet.png',
      '/src/assets/toilet.png',
      '/src/assets/toilet.png',
    ],
    location: 'location description',
    locationImageIds: ['/src/assets/toilet.png'],
    commentsIds: ['1', '2'],
    totalComments: 1,
    gender: 'FEMALE' as 'FEMALE' | 'MALE',
    createdByUser: 'user1',
    createdAt: 'September 19, 2023',
    downVote: 2,
    upVote: 2,
    isDownVoted: false,
    isUpVoted: false,
  },
];

const getRestroomList = (): API.RestroomListData => {
  return restrooms.map((restroom) => {
    return {
      id: restroom.id,
      title: restroom.title,
      tags: restroom.tags,
      building: restroom.building,
      floor: restroom.floor,
      rating: restroom.rating,
      restroomImageIds: restroom.restroomImageIds,
      location: restroom.location,
      totalComments: restroom.totalComments,
      gender: restroom.gender as 'FEMALE' | 'MALE',
      createdByUser: restroom.createdByUser,
      createdAt: restroom.createdAt,
      downVote: restroom.downVote,
      upVote: restroom.upVote,
    };
  });
};

const comments: API.CommentDetailData[] = [
  {
    id: '1',
    rating: 4,
    content: 'first comment',
    commentByUserId: '1',
    commentBy: 'user1',
    commentAt: 'September 25, 2023',
    downVote: 0,
    upVote: 1,
    isDownVoted: false,
    isUpVoted: true,
    childComments: ['3'],
  },
  {
    id: '2',
    rating: 3,
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
  // successful
  mock.onGet('/auth/me').reply(200, createResponse<API.UserData>(user));
  // failed
  // mock.onGet('/auth/me').reply(401, createResponse({error: "Unauthorized", msg: "You need to login to access this resource", data: null}));

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
    let restrooms: API.RestroomListData = getRestroomList();

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

  // POST /restroom/:id/vote
  mock.onPost(/^\/restroom\/(\d+)\/vote$/).reply((config) => {
    const data = JSON.parse(config.data);

    if (!config.url) return [500];

    const result = config.url.match(/^\/restroom\/(\d+)\/vote$/);
    if (result) {
      const id = result[1];
      const index = restrooms.findIndex((restroom) => restroom.id === id);

      if (index === -1) return [400];

      if (data.upVote) {
        restrooms[index].upVote += 1;
        restrooms[index].isUpVoted = true;
        if (restrooms[index].isDownVoted) {
          restrooms[index].isDownVoted = false;
          restrooms[index].downVote -= 1;
        }
      }
      if (data.downVote) {
        restrooms[index].downVote += 1;
        restrooms[index].isDownVoted = true;
        if (restrooms[index].isUpVoted) {
          restrooms[index].isUpVoted = false;
          restrooms[index].upVote -= 1;
        }
      }

      return [200, createResponse(restrooms[index])];
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

    restrooms.push(restroom);
    const response: API.CreateRestroomResponse = createResponse(restroom);

    return [200, response];
  });

  // POST /restroom/:id/review
  mock.onPost(/^\/restroom\/(\d+)\/review$/).reply((config) => {
    const data = JSON.parse(config.data);

    let comment: API.CommentDetailData;

    let parentComment;

    if (data.commentTo) {
      parentComment = comments.find(
        (comment) => comment.id === data?.commentTo,
      );

      comment = {
        id: comments[comments.length - 1].id + 1,
        content: data?.content,
        commentTo: data?.commentTo,
        commentToUser: parentComment?.commentBy,
        commentBy: 'User1',
        commentByUserId: '1',
        commentAt: getCurrentFormattedDate(),
        downVote: 0,
        upVote: 0,
        isUpVoted: false,
        isDownVoted: false,
        childComments: [],
      };
      parentComment?.childComments.push(comment.id);
    } else
      comment = {
        id: comments[comments.length - 1].id + 1,
        rating: data.rating,
        content: data?.content,
        commentBy: 'User1',
        commentByUserId: '1',
        commentAt: getCurrentFormattedDate(),
        downVote: 0,
        upVote: 0,
        isUpVoted: false,
        isDownVoted: false,
        childComments: [],
      };

    comments.push(comment);

    if (!config.url) return [500];

    const result = config.url.match(/^\/restroom\/(\d+)\/review$/);
    if (result) {
      const id = result[1];
      const index = restrooms.findIndex((restroom) => restroom.id === id);
      restrooms[index].commentsIds.push(comment.id);
    }

    if (data.commentTo) {
      return [200, createResponse(parentComment)];
    }

    return [200, createResponse(comment)];
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

  // PATCH /restroom/:id/review
  mock.onPatch(/^\/restroom\/(\d+)\/review$/).reply((config) => {
    const data = JSON.parse(config.data);

    const index = comments.findIndex(
      (comment) => comment.id === data.commentId,
    );

    comments[index].content = data.content;

    return [200, createResponse(comments[index])];
  });

  // POST /restroom/review/:id/vote
  mock.onPost(/^\/restroom\/review\/(\d+)\/vote$/).reply((config) => {
    const data = JSON.parse(config.data);

    if (config.url) {
      const result = config.url.match(/^\/restroom\/review\/(\d+)\/vote$/);
      if (result) {
        const id = result[1];

        const index = comments.findIndex((comment) => comment.id === id);
        if (data.status === 1) {
          comments[index].upVote += 1;
          comments[index].isUpVoted = true;
          if (comments[index].isDownVoted) {
            comments[index].downVote -= 1;
            comments[index].isDownVoted = false;
          }
        }

        if (data.status === 2) {
          comments[index].downVote += 1;
          comments[index].isDownVoted = true;
          if (comments[index].isUpVoted) {
            comments[index].upVote -= 1;
            comments[index].isUpVoted = false;
          }
        }

        if (data.status === 0) {
          if (comments[index].isDownVoted) {
            comments[index].downVote -= 1;
            comments[index].isDownVoted = false;
          }

          if (comments[index].isUpVoted) {
            comments[index].upVote -= 1;
            comments[index].isUpVoted = false;
          }
        }

        return [200, createResponse(comments[index])];
      }
    }

    return [400];
  });
}

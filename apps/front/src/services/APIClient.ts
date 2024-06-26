import axios from 'axios';
// import * as MockAdapter from 'axios-mock-adapter';
// import configureMock from './mock.ts';

// const isMock = import.meta.env.VITE_API_MOCK === 'true';

const APIClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

// let mock: MockAdapter;
//
// if (isMock) {
//   mock = new MockAdapter(APIClient);
//
//   configureMock(mock);
// }
export default APIClient;

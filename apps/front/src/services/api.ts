import APIClient from './APIClient.ts';
import LoginData = API.LoginData;

// POST /auth/login
export function login({
  username,
  password,
}: API.LoginParams): Promise<LoginData> {
  return APIClient.post<API.LoginResponse>('/auth/login', {
    username,
    password,
  }).then((res) => res.data.data);
}

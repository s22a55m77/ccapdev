import { create } from 'zustand';

type State = {
  isLogin?: boolean;
  user?: API.UserData;
};

type Action = {
  setUser: (list: API.UserData) => void;
  setUserLoginState: (state: boolean) => void;
};

export const useUserStore = create<State & Action>((set) => ({
  setUser: (user: API.UserData) =>
    set(() => ({
      user,
    })),
  setUserLoginState: (state: boolean) =>
    set(() => ({
      isLogin: state,
    })),
}));

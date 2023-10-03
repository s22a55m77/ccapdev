import { create } from 'zustand';

type State = {
  user: API.UserData | {};
};

type Action = {
  setUser: (list: API.UserData) => void;
};

export const useUserStore = create<State & Action>((set) => ({
  user: {},
  setUser: (user: API.UserData) =>
    set(() => ({
      user,
    })),
}));

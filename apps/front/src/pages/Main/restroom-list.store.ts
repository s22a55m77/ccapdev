import { create } from 'zustand';

type State = {
  originalList: API.RestroomListData;
  restroomList: API.RestroomListData;
};

type Action = {
  setRestroomList: (list: API.RestroomListData) => void;
  setOriginalList: (list: API.RestroomListData) => void;
};

export const useRestroomList = create<State & Action>((set) => ({
  restroomList: [],
  originalList: [],
  setRestroomList: (list: API.RestroomListData) =>
    set(() => ({ restroomList: list })),
  setOriginalList: (list: API.RestroomListData) =>
    set(() => ({ originalList: list })),
}));

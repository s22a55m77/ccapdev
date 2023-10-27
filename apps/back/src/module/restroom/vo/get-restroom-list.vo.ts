type RestroomList = {
  id: string;
  title: string;
  building: string;
  floor: number;
  location: string; // location detail
  rating: number;
  tags: string[];
  restroomImageIds: string[];
  totalComments: number;
  gender: 'MALE' | 'FEMALE';
  createdByUser: string;
  createdAt: string;
};

export type GetRestroomListVo = RestroomList[];

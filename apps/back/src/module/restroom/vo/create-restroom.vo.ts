export class CreateRestroomVo {
  id: string;
  title: string;
  building: string;
  floor: number;
  location: string; // location detail
  rating: number;
  tags: string[];
  locationImageIds: string[];
  restroomImageIds: string[];
  commentsIds: string[];
  totalComments: number;
  gender: 'MALE' | 'FEMALE';
  createdByUser: string;
  createdAt: string;
}

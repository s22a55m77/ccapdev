import { GenderType } from 'src/model/restroom.entity';

export class CreateRestroomVo {
  id: number;
  title: string;
  building: string;
  floor: number;
  location: string; // location detail
  rating: number;
  tags: string[];
  locationImageIds: number[];
  restroomImageIds: number[];
  commentsIds: number[];
  totalComments: number;
  gender: GenderType;
  createdByUser: string;
  createdAt: string;
}

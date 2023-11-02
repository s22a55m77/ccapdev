import { GenderType } from '../../../model/restroom.entity';

export class GetRestroomListVo {
  id: number;
  title: string;
  building: string;
  floor: number;
  location: string; // location detail
  rating: number;
  tags: string[];
  restroomImageIds: number[];
  totalComments: number;
  gender: GenderType;
  createdByUser: string;
  createdByUserId: number;
  createdAt: string;
}

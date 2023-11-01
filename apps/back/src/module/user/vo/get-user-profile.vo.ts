import { RoleType } from '../../../model/user.entity';

export type UserHistory = {
  id: number;
  title: string;
  content: string;
  rating?: number;
  commentTo?: number; // comment ID to which it comments to
  commentToUser?: string; // username
  commentByUserId: number; // userId
  commentBy?: string; // username
  type: 'Reply' | 'Submit' | 'Review';
};

export class GetUserProfileVo {
  id: number;
  username: string;
  reviews: number;
  dateRegistered: string;
  description: string;
  role: RoleType;
  profilePicId: number;
  history: UserHistory[];
}

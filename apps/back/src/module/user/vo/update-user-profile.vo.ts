type UserHistory = {
  id: string;
  title: string;
  content: string;
  rating?: number;
  commentTo?: string; // comment ID to which it comments to
  commentToUser?: string; // username
  commentByUserId: string; // userId
  commentBy?: string; // username
  type: 'Reply' | 'Submit' | 'Review';
};

export class UpdateUserProfileVo {
  id: string;
  username: string;
  reviews: number;
  dateRegistered: number;
  description: string;
  role: 'USER' | 'ADMIN';
  profilePicId: string;
  history: UserHistory[];
}

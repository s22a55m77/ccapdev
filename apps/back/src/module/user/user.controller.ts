import { Controller, Get, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //PATCH /user/profile
  @Patch('profile')
  updateUserProfile() {}

  // PATCH /user/profile/pic
  @Patch('profile/pic')
  updateProfilePic() {}

  // GET /user/:id/profile
  @Get(':id/profile')
  getUserProfile(@Param('id') id: string) {
    return id;
  }
}

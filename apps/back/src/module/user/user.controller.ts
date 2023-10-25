import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //PATCH /user/profile
  @Patch('profile')
  updateUserProfile(@Body() updateUserProfileDto: UpdateUserProfileDto) {}

  // PATCH /user/profile/pic
  @Patch('profile/pic')
  updateProfilePic(@UploadedFile() file) {}

  // GET /user/:id/profile
  @Get(':id/profile')
  getUserProfile(@Param('id') id: string) {
    return id;
  }
}

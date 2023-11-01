import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Patch,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Auth } from '../auth/auth';
import { RoleType, UserEntity } from '../../model/user.entity';
import { AuthUser } from '../auth/auth-user';
import { ResponseVo } from '../../common/response.vo';
import { GetUserProfileVo } from './vo/get-user-profile.vo';
import { retry } from 'rxjs';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //PATCH /user/profile
  @Patch('profile')
  @Auth([RoleType.USER, RoleType.ADMIN])
  updateUserProfile(
    @Body() updateUserProfileDto: UpdateUserProfileDto,
    @AuthUser() user: UserEntity,
  ) {
    // TODO
  }

  // PATCH /user/profile/pic
  @Patch('profile/pic')
  @Auth([RoleType.USER, RoleType.ADMIN])
  @UseInterceptors(FileInterceptor('file'))
  updateProfilePic(
    @UploadedFile() file: Express.Multer.File,
    @AuthUser() user: UserEntity,
  ) {
    const image = file.buffer.toString('base64');
    return this.userService.updateProfilePic(user.id, image);
  }

  // GET /user/:id/profile
  @Get(':id/profile')
  // @Auth([RoleType.USER, RoleType.ADMIN])
  async getUserProfile(
    @Param('id') id: number,
    @AuthUser() user: UserEntity,
  ): Promise<ResponseVo<GetUserProfileVo>> {
    const userProfile = await this.userService.getUserProfile(id);
    return ResponseVo.success(userProfile);
  }

  // GET /user:id/profile/pic
  @Get(':id/profile/pic')
  @Header('Content-Type', 'image/jpeg')
  async getProfilePic(): Promise<StreamableFile> {
    const user = await this.userService.getProfilePicById(2);

    const buffer = Buffer.from(user.profilePicId.toString(), 'base64');
    return new StreamableFile(buffer);
  }
}

import {
  Body,
  Controller,
  Get,
  Header,
  NotFoundException,
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
import { UpdateUserProfileVo } from './vo/update-user-profile.vo';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //PATCH /user/profile
  @Patch('profile')
  @Auth([RoleType.USER, RoleType.ADMIN])
  async updateUserProfile(
    @Body() updateUserProfileDto: UpdateUserProfileDto,
    @AuthUser() user: UserEntity,
  ): Promise<ResponseVo<UpdateUserProfileVo>> {
    const userProfile = await this.userService.updateProfile(
      user.id,
      updateUserProfileDto,
    );
    return ResponseVo.success(userProfile);
  }

  // PATCH /user/profile/pic
  @Patch('profile/pic')
  @Auth([RoleType.USER, RoleType.ADMIN])
  @UseInterceptors(FileInterceptor('file'))
  async updateProfilePic(
    @UploadedFile() file: Express.Multer.File,
    @AuthUser() user: UserEntity,
  ) {
    const image = file.buffer.toString('base64');
    await this.userService.updateProfilePic(user.id, image);
    const profile = await this.userService.getUserProfile(user.id);
    return ResponseVo.success(profile);
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
  async getProfilePic(@Param('id') id: string): Promise<StreamableFile> {
    const user = await this.userService.getProfilePicById(Number(id));

    if (!user) {
      throw new NotFoundException('User does not have profile pic');
    }

    const buffer = Buffer.from(user.profilePicId.toString(), 'base64');
    return new StreamableFile(buffer);
  }
}

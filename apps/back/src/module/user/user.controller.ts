import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // GET /user/:id/profile
  @Get(':id/profile')
  getUserProfile(@Param('id') id: string) {
    return id;
  }
}

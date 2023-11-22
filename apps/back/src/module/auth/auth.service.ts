import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserEntity } from '../../model/user.entity';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<UserEntity> {
    const user: UserEntity | null =
      await this.userService.getUserByUsername(username);

    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid Password');
    }

    return user;
  }
}

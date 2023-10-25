import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleType, UserEntity } from '../../model/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async createAccessToken(data: {
    role: RoleType;
    userId: number;
  }): Promise<string> {
    return this.jwtService.signAsync({
      userId: data.userId,
      role: data.role,
    });
  }

  async validateUser(loginDto: LoginDto): Promise<UserEntity> {
    const user: UserEntity | null =
      await this.userService.getUserByUsername(loginDto.username);

    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    // FIXME MCO3 compare with encrypted password
    const isPasswordValid = loginDto.password === user.password;

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid Password');
    }

    return user;
  }
}

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
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  tokenMap = new Map();

  async createAccessToken(data: {
    role: RoleType;
    userId: number;
  }): Promise<string> {
    const token = await this.jwtService.signAsync({
      userId: data.userId,
      role: data.role,
    });

    this.tokenMap.set(data.userId, token);

    return token;
  }

  validateToken(userId: number, token: string): boolean {
    return this.tokenMap.get(userId) === token;
  }

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

  logout(userId: number) {
    this.tokenMap.delete(userId);
  }
}

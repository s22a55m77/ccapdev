import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../model/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  getUserById(id: number) {
    // TODO 想办法把reviews查出来然后组装在一起

    return this.userRepo.find({
      select: {
        id: true,
        username: true,
        description: true,
        role: true,
        dateRegistered: true,
      },
      where: { id },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../model/user.entity';
import { InsertResult, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  getUserById(id: number): Promise<UserEntity> {
    // TODO 想办法把reviews查出来然后组装在一起

    return this.userRepo.findOne({
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

  getUserByUsername(username: string): Promise<UserEntity | null> {
    return this.userRepo.findOne({
      select: {
        id: true,
        username: true,
        password: true,
        description: true,
        role: true,
        dateRegistered: true,
      },
      where: {
        username,
      },
    });
  }

  async insertUser(user: UserEntity): Promise<UserEntity> {
    const id: number = await this.userRepo
      .insert(user)
      .then((res) => res.identifiers[0].id as number);

    return this.getUserById(id);
  }
}

import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RestroomService } from '../restroom/restroom.service';
import { EntitiesModule } from '../entity/entities.module';

@Module({
  imports: [EntitiesModule],
  controllers: [UserController],
  providers: [UserService, RestroomService],
})
export class UserModule {}

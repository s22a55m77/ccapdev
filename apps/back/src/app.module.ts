import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BuildingEntity } from './model/building.entity';
import { CityEntity } from './model/city.entity';
import { CommentEntity } from './model/comment.entity';
import { FloorEntity } from './model/floor.entity';
import { ImageEntity } from './model/image.entity';
import { ProvinceEntity } from './model/province.entity';
import { RegionEntity } from './model/region.entity';
import { ReportEntity } from './model/report.entity';
import { RestroomEntity } from './model/restroom.entity';
import { RestroomTagEntity } from './model/restroom-tag.entity';
import { TagEntity } from './model/tag.entity';
import { UserEntity } from './model/user.entity';
import { VoteEntity } from './model/vote.entity';
import { RestroomModule } from './module/restroom/restroom.module';
import { AuthModule } from './module/auth/auth.module';
import { ReportModule } from './module/report/report.module';
import { CommentModule } from './module/comment/comment.module';
import { UserModule } from './module/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        logging: configService.get<boolean>('DB_LOG'),
        ssl: configService.get<boolean>('DB_SSL'),
        migrationsRun: false,
        entities: [
          BuildingEntity,
          CityEntity,
          CommentEntity,
          FloorEntity,
          ImageEntity,
          ProvinceEntity,
          RegionEntity,
          ReportEntity,
          RestroomEntity,
          RestroomTagEntity,
          TagEntity,
          UserEntity,
          VoteEntity,
        ],
        synchronize: configService.get<boolean>('DB_SYNC'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    RestroomModule,
    ReportModule,
    CommentModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

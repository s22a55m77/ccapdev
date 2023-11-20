import {
  Body,
  ConflictException,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Header,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  StreamableFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { RestroomService } from './restroom.service';
import { UpdateRestroomReviewDto } from './dto/update-restroom-review.dto';
import { CreateRestroomDto } from './dto/create-restroom.dto';
import { CreateRestroomReviewDto } from './dto/create-restroom-review.dto';
import { GetFilterOptionsVo } from './vo/get-filter-options.vo';
import { ResponseVo } from '../../common/response.vo';
import { GetRestroomDetailVo } from './vo/get-restroom-detail.vo';
import { CreateRestroomVo } from './vo/create-restroom.vo';
import { CreateRestroomReviewVo } from './vo/create-restroom-review.vo';
import { UpdateRestroomReviewVo } from './vo/update-restroom-review.vo';
import { DeleteRestroomReviewVo } from './vo/delete-restroom-review.vo';
import { ChangeVoteStatusVo } from './vo/change-vote-status.vo';
import { ChangeVoteStatusDto } from './dto/change-vote-status.dto';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { Auth } from '../auth/auth';
import { RoleType, UserEntity } from 'src/model/user.entity';
import { AuthUser } from '../auth/auth-user';
import { GetRestroomListVo } from './vo/get-restroom-list.vo';

@Controller('restroom')
export class RestroomController {
  constructor(private readonly restroomService: RestroomService) {}

  // GET /restroom/filter
  @Get('filter')
  async getFilterOptions(): Promise<ResponseVo<GetFilterOptionsVo>> {
    const filter: GetFilterOptionsVo =
      await this.restroomService.getFilterOptions();
    return ResponseVo.success(filter);
  }

  // GET /restroom
  @Get()
  async getRestroomList(
    @Query('sort') sort: 'RATING' | 'NEW',
    @Query('region') region?: string,
    @Query('province') province?: string,
    @Query('city') city?: string,
    @Query('building') building?: string,
    @Query('floor') floor?: string,
    @Query('gender') gender?: 'MALE' | 'FEMALE',
    @Query('availability') availability?: string,
  ): Promise<ResponseVo<GetRestroomListVo[]>> {
    if (city) city = JSON.parse(city);
    if (region) region = JSON.parse(region);
    if (province) province = JSON.parse(province);
    if (building) building = JSON.parse(building);
    if (floor) floor = JSON.parse(floor);
    if (availability) availability = JSON.parse(availability);

    const data = await this.restroomService.getRestroomList({
      sort,
      gender,
      availability,
      region,
      province,
      city,
      building,
      floor,
    });

    return ResponseVo.success(data);
  }

  // GET /restroom/:id
  @Get(':id')
  async getRestroomDetail(
    @Param('id') id: number,
  ): Promise<ResponseVo<GetRestroomDetailVo>> {
    const restroomDetail = await this.restroomService.getRestroomDetail(
      id,
    );
    if (!restroomDetail)
      throw new NotFoundException('Restroom does not exist');

    return ResponseVo.success(restroomDetail);
  }

  // POST /restroom
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'locationImages' },
      { name: 'restroomImages' },
    ]),
  )
  @Auth([RoleType.USER, RoleType.ADMIN])
  async createRestroom(
    @Body() createRestroomDto: CreateRestroomDto,
    @UploadedFiles()
    files: {
      locationImages: Express.Multer.File[];
      restroomImages: Express.Multer.File[];
    },
    @AuthUser() user: UserEntity,
  ): Promise<ResponseVo<CreateRestroomVo>> {
    createRestroomDto.tags = JSON.parse(createRestroomDto.tags);
    const restroom = await this.restroomService.createRestroom(
      createRestroomDto,
      files,
      user.id,
    );
    return ResponseVo.success(restroom);
  }

  // POST /restroom/:id/review
  @Post(':id/review')
  @Auth([RoleType.USER, RoleType.ADMIN])
  async createRestroomReview(
    @Param('id') id: number,
    @Body() createRestroomReviewDto: CreateRestroomReviewDto,
    @AuthUser() user: UserEntity,
  ): Promise<ResponseVo<CreateRestroomReviewVo>> {
    // TODO user在每个restroom只能有一个review。回复不管多少。所以要判断user有没有review过了，如果有返回409 conflict
    const hasReview = await this.restroomService.hasReview(id, user.id);

    if (hasReview) throw new ConflictException('Already Reviewed');

    const review = await this.restroomService.createRestroomReview(
      id,
      createRestroomReviewDto,
      user.id,
    );

    return ResponseVo.success(review);
  }

  // PATCH /restroom/:id/review
  @Patch(':id/review')
  @Auth([RoleType.USER, RoleType.ADMIN])
  async updateRestroomReview(
    @Param('id') id: number,
    @Body() updateRestroomReviewDto: UpdateRestroomReviewDto,
    @AuthUser() user: UserEntity,
  ): Promise<ResponseVo<UpdateRestroomReviewVo>> {
    const review = await this.restroomService.findReviewById(id);

    if (!review) {
      throw new NotFoundException('Review not found');
    }
    if (user.id !== review.commentById) {
      throw new ForbiddenException(
        'You are not authorized to update this review.',
      );
    }

    const updatedReview = await this.restroomService.updateRestroomReview(
      user.id,
      id,
      updateRestroomReviewDto,
    );

    return ResponseVo.success(updatedReview);
  }

  // DELETE /restroom/:id/review/
  @Delete(':id/review')
  @Auth([RoleType.USER, RoleType.ADMIN])
  async deleteRestroomReview(
    @Param('id') id: string,
    @AuthUser() user: UserEntity,
  ): Promise<ResponseVo<DeleteRestroomReviewVo>> {
    // TODO 判断是不是本人修改，不是返回403
    try {
      await this.restroomService.deleteRestroomReview(id);
      return ResponseVo.success({ success: true });
    } catch (e) {
      throw new NotFoundException('Review Not Found');
    }
  }

  // POST /restroom/review/:id/vote
  @Post('review/:id/vote')
  @Auth([RoleType.USER, RoleType.ADMIN])
  async changeVoteStatus(
    @Param('id') id: string,
    @Body('status') status: number,
    @AuthUser() user: UserEntity,
  ): Promise<ResponseVo<ChangeVoteStatusVo>> {
    const review = await this.restroomService.changeVoteStatus(
      Number(id),
      status,
      user.id,
    );

    return ResponseVo.success(review);
  }

  // GET /restroom/:id/image
  @Get(':id/image')
  @Header('Content-Type', 'image/jpeg')
  async getImage(@Param('id') id: string) {
    const entity = await this.restroomService.getImage(Number(id));
    const buffer = Buffer.from(entity.image.toString(), 'base64');
    return new StreamableFile(buffer);
  }
}

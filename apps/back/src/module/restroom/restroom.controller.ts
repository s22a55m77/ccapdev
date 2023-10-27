import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { RestroomService } from './restroom.service';
import { UpdateRestroomReviewDto } from './dto/update-restroom-review.dto';
import { GetRestroomListDto } from './dto/get-restroom-list.dto';
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
import { GetAdminReportListVo } from './vo/get-admin-report-list.vo';

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

  // TODO 这个可以留到最后，不然数据库没数据无法测试
  // GET /restroom
  @Get()
  getRestroomList(
    @Query('sort') sort: 'RATING' | 'NEW',
    @Query('region') region?: string,
    @Query('province') province?: string,
    @Query('city') city?: string,
    @Query('building') building?: string,
    @Query('floor') floor?: string,
    @Query('gender') gender?: 'MALE' | 'FEMALE',
    @Query('availability') availability?: string,
  ) {
    if (city) city = JSON.parse(city.substring(1).slice(0, -1));
    if (region) region = JSON.parse(region.substring(1).slice(0, -1));
    if (province)
      province = JSON.parse(province.substring(1).slice(0, -1));
    if (building)
      building = JSON.parse(building.substring(1).slice(0, -1));
    if (floor) floor = JSON.parse(floor.substring(1).slice(0, -1));

    // TODO
    return { city, region, gender, province, sort };
  }

  // GET /restroom/:id
  @Get(':id')
  async getRestroomDetail(
    @Param('id') id: string,
  ): Promise<ResponseVo<GetRestroomDetailVo>> {
    const restroomDetail = await this.restroomService.getRestroomDetail(
      id,
    );
    if (restroomDetail)
      throw new NotFoundException('Restroom does not exist');

    return ResponseVo.success(restroomDetail);
  }

  // TODO 需要接收图片 https://docs.nestjs.com/techniques/file-upload
  // POST /restroom
  @Post()
  async createRestroom(
    @Body() createRestroomDto: CreateRestroomDto,
  ): Promise<ResponseVo<CreateRestroomVo>> {
    const restroom = await this.restroomService.createRestroom(
      createRestroomDto,
    );
    return ResponseVo.success(restroom);
  }

  // POST /restroom/:id/review
  @Post(':id/review')
  async createRestroomReview(
    @Param('id') id: string,
    @Body() createRestroomReviewDto: CreateRestroomReviewDto,
  ): Promise<ResponseVo<CreateRestroomReviewVo>> {
    const review = await this.restroomService.createRestroomReview(
      id,
      createRestroomReviewDto,
    );

    return ResponseVo.success(review);
  }

  // PATCH /restroom/:id/review
  @Patch(':id/review')
  async updateRestroomReview(
    @Param('id') id: string,
    @Body() updateRestroomReviewDto: UpdateRestroomReviewDto,
  ): Promise<ResponseVo<UpdateRestroomReviewVo>> {
    // TODO 判断是不是本人修改，不是返回403
    const review = await this.restroomService.updateRestroomReview(
      id,
      updateRestroomReviewDto,
    );

    return ResponseVo.success(review);
  }

  // DELETE /restroom/:id/review/
  @Delete(':id/review')
  async deleteRestroomReview(
    @Param('id') id: string,
  ): Promise<ResponseVo<DeleteRestroomReviewVo>> {
    // TODO 判断是不是本人修改，不是返回403
    try {
      await this.restroomService.deleteRestroomReview(id);
      return ResponseVo.success({ success: true });
    } catch (e) {
      // TODO 处理报错;
    }
  }

  // POST /restroom/review/:id/vote
  @Post('review/:id/vote')
  async changeVoteStatus(
    @Param('id') id: string,
    @Body() status: number,
  ): Promise<ResponseVo<ChangeVoteStatusVo>> {
    const review = await this.restroomService.changeVoteStatus(id, status);

    return ResponseVo.success(review);
  }

  // GET /restroom/creation
  @Get('creation')
  async getAdminReportList(): Promise<ResponseVo<GetAdminReportListVo>> {
    const list = await this.restroomService.getAdminReportList();
    return ResponseVo.success(list);
  }

  // TODO 返回图片 https://docs.nestjs.com/techniques/streaming-files
  // GET /restroom/:id/image
  @Get(':id/image')
  async getImage() {}
}

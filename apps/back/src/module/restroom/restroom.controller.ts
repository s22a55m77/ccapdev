import {
  Body,
  Controller,
  Delete,
  Get,
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
  getRestroomList(@Body() getRestroomListDto: GetRestroomListDto) {}

  // GET /restroom/:id
  @Get(':id')
  getRestroomDetail(@Param('id') id: string) {}

  // POST /restroom
  @Post()
  createRestroom(@Body() createRestroomDto: CreateRestroomDto) {}

  // POST /restroom/:id/review
  @Post(':id/review')
  createRestroomReview(
    @Param('id') id: string,
    @Body() createRestroomReviewDto: CreateRestroomReviewDto,
  ) {}

  // PATCH /restroom/:id/review
  @Patch(':id/review')
  updateRestroomReview(
    @Param('id') id: string,
    @Body() updateRestroomReviewDto: UpdateRestroomReviewDto,
  ) {
    return id;
  }

  // DELETE /restroom/:id/review/
  @Delete(':id/review')
  deleteRestroomReview(@Param('id') id: string, @Body() status: number) {}

  // POST /restroom/review/:id/vote
  @Post('review/:id/vote')
  changeVoteStatus(@Param('id') id: string) {}

  // GET /restroom/creation
  @Get('creation')
  getAdminReportList() {}
}

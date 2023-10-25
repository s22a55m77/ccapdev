import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RestroomService } from './restroom.service';
import { UpdateRestroomReviewDto } from './dto/update-restroom-review.dto';

@Controller('restroom')
export class RestroomController {
  constructor(private readonly restroomService: RestroomService) {}

  // GET /restroom/filter
  @Get('filter')
  getFilterOptions() {}

  // GET /restroom
  @Get()
  getRestroomList() {}

  // GET /restroom/:id
  @Get(':id')
  getRestroomDetail(@Param('id') id: string) {}

  // POST /restroom
  @Post()
  createRestroom() {}

  // POST /restroom/:id/review
  @Post(':id/review')
  createRestroomReview(@Param('id') id: string) {}

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
  deleteRestroomReview(@Param('id') id: string) {}

  // POST /restroom/review/:id/vote
  @Post('review/:id/vote')
  changeVoteStatus(@Param('id') id: string) {}

  // GET /restroom/creation
  @Get('creation')
  getAdminReportList() {}
}

import { Body, Controller, Param, Patch } from '@nestjs/common';
import { RestroomService } from './restroom.service';
import { UpdateRestroomReviewDto } from './dto/update-restroom-review.dto';

@Controller('restroom')
export class RestroomController {
  constructor(private readonly restroomService: RestroomService) {}

  // PATCH /restroom/:id/review
  @Patch(':id/review')
  updateRestroomReview(
    @Param('id') id: string,
    @Body() updateRestroomReviewDto: UpdateRestroomReviewDto,
  ) {
    return id;
  }
}

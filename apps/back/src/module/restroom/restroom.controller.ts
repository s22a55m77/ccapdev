import { Controller, Param, Patch } from '@nestjs/common';
import { RestroomService } from './restroom.service';

@Controller('restroom')
export class RestroomController {
  constructor(private readonly restroomService: RestroomService) {}

  // PATCH /restroom/:id/review
  @Patch(':id/review')
  getRestroomReview(@Param('id') id: string) {
    return id;
  }
}

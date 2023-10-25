import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  // GET  /report/:id
  @Get(':id')
  getReportDetail(@Param('id') id: string) {}

  // PATCH /report/:id
  @Patch(':id')
  changeReportStatus(@Param('id') id: string, @Body() status: number) {}
}

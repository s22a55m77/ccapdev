import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { ReportService } from './report.service';
import { ResponseVo } from '../../common/response.vo';
import { GetReportDetailVo } from './vo/get-report-detail.vo';
import { ChangeReportStatusVo } from './vo/change-report-status.vo';
import { Auth } from '../auth/auth';
import { RoleType } from 'src/model/user.entity';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  // GET  /report/:id
  @Get(':id')
  @Auth([RoleType.ADMIN])
  async getReportDetail(
    @Param('id') id: string,
  ): Promise<ResponseVo<GetReportDetailVo>> {
    const report = await this.reportService.getReportDetail(id);
    return ResponseVo.success(report);
  }

  // PATCH /report/:id
  @Patch(':id')
  @Auth([RoleType.USER, RoleType.ADMIN])
  async changeReportStatus(
    @Param('id') id: string,
    @Body() status: number,
  ): Promise<ResponseVo<ChangeReportStatusVo>> {
    const report = await this.reportService.changeReportStatus(id, status);
    return ResponseVo.success(report);
  }
}

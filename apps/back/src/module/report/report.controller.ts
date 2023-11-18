import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { ResponseVo } from '../../common/response.vo';
import { GetReportDetailVo } from './vo/get-report-detail.vo';
import { ChangeReportStatusVo } from './vo/change-report-status.vo';
import { Auth } from '../auth/auth';
import { RoleType, UserEntity } from 'src/model/user.entity';
import { AuthUser } from '../auth/auth-user';
import { ReportType } from 'src/model/report.entity';
import { GetAdminReportListVo } from '../restroom/vo/get-admin-report-list.vo';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  // GET /report
  @Get()
  @Auth([RoleType.ADMIN])
  async getAdminReportList(
    @AuthUser() user: UserEntity,
  ): Promise<ResponseVo<GetAdminReportListVo[]>> {
    const list = await this.reportService.getAdminReportList();
    return ResponseVo.success(list);
  }

  // GET  /report/:id
  @Get(':id')
  @Auth([RoleType.ADMIN])
  async getReportDetail(
    @Param('id') id: number,
    @AuthUser() user: UserEntity,
  ): Promise<ResponseVo<GetReportDetailVo>> {
    const report = await this.reportService.getReportDetail(id);
    return ResponseVo.success(report);
  }

  // PATCH /report/:id
  @Patch(':id')
  @Auth([RoleType.ADMIN])
  async changeReportStatus(
    @Param('id') id: number,
    @Body('status') status: number,
    @AuthUser() user: UserEntity,
  ): Promise<ResponseVo<ChangeReportStatusVo>> {
    const report = await this.reportService.changeReportStatus(
      id,
      status,
      user.id,
    );
    return ResponseVo.success(report);
  }

  // POST /report/:id
  @Post(':id')
  @Auth([RoleType.USER, RoleType.ADMIN])
  async report(
    @Param('id') id: number,
    @AuthUser() user: UserEntity,
  ): Promise<ResponseVo<{ success: true }>> {
    // TODO 用户对每个restroom只能report一次，返回409 conflict 如果重复了。
    const report = await this.reportService.report(id, user.id);
    if (report) return ResponseVo.success({ success: true });
    throw new InternalServerErrorException('Unknown Error');
  }
}

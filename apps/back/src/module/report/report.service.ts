import { Injectable } from '@nestjs/common';
import { GetReportDetailVo } from './vo/get-report-detail.vo';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportEntity } from '../../model/report.entity';
import { Repository } from 'typeorm';
import { ChangeReportStatusVo } from './vo/change-report-status.vo';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(ReportEntity)
    private readonly reportRepo: Repository<ReportEntity>,
  ) {}

  async getReportDetail(id: string): Promise<GetReportDetailVo> {
    // TODO
    return null;
  }

  async changeReportStatus(
    id: string,
    status: number,
  ): Promise<ChangeReportStatusVo> {
    // TODO
    return null;
  }
}

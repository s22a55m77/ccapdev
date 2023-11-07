import { ReportType } from 'src/model/report.entity';
import { GenderType } from 'src/model/restroom.entity';

export class GetReportDetailVo {
  id: number;
  restroomId: number;
  title: string;
  building: string;
  floor: number;
  location: string; // location detail
  locationImageIds: number[];
  restroomImageIds: number[];
  gender: GenderType;
  createdByUser: string;
  createdAt: string;
  status: ReportType;
}

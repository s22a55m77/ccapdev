import { ReportType } from 'src/model/report.entity';
import { GenderType } from 'src/model/restroom.entity';

export class ChangeReportStatusVo {
  id: number;
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

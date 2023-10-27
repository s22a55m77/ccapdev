export class GetReportDetailVo {
  id: string;
  title: string;
  building: string;
  floor: number;
  location: string; // location detail
  locationImageIds: string[];
  restroomImageIds: string[];
  gender: 'MALE' | 'FEMALE';
  createdByUser: string;
  createdAt: string;
  status: number;
}

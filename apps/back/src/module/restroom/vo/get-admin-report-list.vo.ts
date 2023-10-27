type AdminReportList = {
  id: string;
  title: string;
  region: string;
  province: string;
  city: string;
  building: string;
  floor: number;
  status: number;
};

export type GetAdminReportListVo = AdminReportList[];

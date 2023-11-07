import { Injectable } from '@nestjs/common';
import { GetReportDetailVo } from './vo/get-report-detail.vo';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportEntity, ReportType } from '../../model/report.entity';
import { Repository } from 'typeorm';
import { ChangeReportStatusVo } from './vo/change-report-status.vo';
import { UserService } from '../user/user.service';
import { RestroomService } from '../restroom/restroom.service';
import { GetRestroomDetailVo } from '../restroom/vo/get-restroom-detail.vo';
import { GetAdminReportListVo } from '../restroom/vo/get-admin-report-list.vo';
import { FloorEntity } from '../../model/floor.entity';
import { BuildingEntity } from '../../model/building.entity';
import { CityEntity } from '../../model/city.entity';
import { ProvinceEntity } from '../../model/province.entity';
import { RegionEntity } from '../../model/region.entity';
import { RestroomEntity, StatusType } from '../../model/restroom.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(ReportEntity)
    private readonly reportRepo: Repository<ReportEntity>,
    @InjectRepository(RestroomEntity)
    private readonly restroomRepo: Repository<RestroomEntity>,
    private readonly userService: UserService,
    private readonly restroomService: RestroomService,
  ) {}

  async getReportDetail(id: number): Promise<GetReportDetailVo> {
    // TODO
    const getReportDetailVo: GetReportDetailVo = new GetReportDetailVo();
    const reportEntity: ReportEntity = await this.reportRepo.findOne({
      where: {
        id,
      },
    });
    if (reportEntity === null) return null;

    getReportDetailVo.id = reportEntity.id;
    getReportDetailVo.restroomId = reportEntity.restroomId;
    // title, building, floor .... gender
    const restroomEntity: GetRestroomDetailVo =
      await this.restroomService.getRestroomDetail(
        reportEntity.restroomId,
      );
    getReportDetailVo.title = restroomEntity.title;
    getReportDetailVo.building = restroomEntity.building;
    getReportDetailVo.floor = restroomEntity.floor;
    getReportDetailVo.location = restroomEntity.location;
    getReportDetailVo.locationImageIds = restroomEntity.locationImageIds;
    getReportDetailVo.restroomImageIds = restroomEntity.restroomImageIds;
    getReportDetailVo.gender = restroomEntity.gender;

    getReportDetailVo.createdByUser = (
      await this.userService.getUserById(reportEntity.reportedById)
    ).username;
    getReportDetailVo.createdAt = new Date(
      reportEntity.reportedAt,
    ).toDateString();
    getReportDetailVo.status = reportEntity.status;
    return getReportDetailVo;
  }

  async changeReportStatus(
    id: number,
    status: number,
    adminId: number,
  ): Promise<ChangeReportStatusVo> {
    if (status === 1) {
      const returning = await this.reportRepo
        .createQueryBuilder()
        .update()
        .set({
          status: ReportType.CLOSED,
          processById: adminId,
        })
        .where('id = :id', { id })
        .returning('"restroomId"')
        .execute();
      await this.restroomRepo.update(
        { id: returning.raw[0].restroomId },
        {
          status: StatusType.APPROVED,
        },
      );
    } else if (status === 0) {
      const returning = await this.reportRepo
        .createQueryBuilder()
        .update()
        .set({
          status: ReportType.RESOLVED,
          processById: adminId,
        })
        .where('id = :id', { id })
        .returning('"restroomId"')
        .execute();
      await this.restroomRepo.update(
        { id: returning.raw[0].restroomId },
        {
          status: StatusType.DISAPPROVED,
        },
      );
    }

    // query
    const changeReportStatusVo: ChangeReportStatusVo =
      new ChangeReportStatusVo();

    const reportEntity: ReportEntity = await this.reportRepo.findOne({
      where: {
        id,
      },
    });
    if (reportEntity === null) return null;

    changeReportStatusVo.id = id;

    // title, building, floor .... gender
    const restroomEntity: GetRestroomDetailVo =
      await this.restroomService.getRestroomDetail(
        reportEntity.restroomId,
      );
    changeReportStatusVo.title = restroomEntity.title;
    changeReportStatusVo.building = restroomEntity.building;
    changeReportStatusVo.floor = restroomEntity.floor;
    changeReportStatusVo.location = restroomEntity.location;
    changeReportStatusVo.locationImageIds =
      restroomEntity.locationImageIds;
    changeReportStatusVo.restroomImageIds =
      restroomEntity.restroomImageIds;
    changeReportStatusVo.gender = restroomEntity.gender;

    changeReportStatusVo.createdByUser = (
      await this.userService.getUserById(reportEntity.reportedById)
    ).username;
    changeReportStatusVo.createdAt = new Date(
      reportEntity.reportedAt,
    ).toDateString();
    changeReportStatusVo.status = reportEntity.status;

    return changeReportStatusVo;
  }

  async getAdminReportList(): Promise<GetAdminReportListVo[]> {
    const rawResult = await this.reportRepo
      .createQueryBuilder('re')
      .select([
        're.id AS id',
        'r2.name AS region',
        'p.name AS province',
        'c.name AS city',
        'b.name AS building',
        'f.floor AS floor',
        're.status AS status',
        'r.gender AS gender',
      ])
      .leftJoin(RestroomEntity, 'r', 're."restroomId"=r.id')
      .leftJoin(FloorEntity, 'f', 'f.id=r."floorId"')
      .leftJoin(BuildingEntity, 'b', 'b.id=f."buildingId"')
      .leftJoin(CityEntity, 'c', 'c.id=b."cityId"')
      .leftJoin(ProvinceEntity, 'p', 'p.id=c."provinceId"')
      .leftJoin(RegionEntity, 'r2', 'r2.id=p."regionId"')
      .orderBy('re."reportedAt"', 'DESC')
      .execute();

    const result: GetAdminReportListVo[] = rawResult.map((raw) => {
      const vo = new GetAdminReportListVo();
      vo.id = raw.id;
      vo.title = `${raw.building} - ${raw.floor} - ${raw.gender} - ${raw.city} - ${raw.province} - ${raw.region}`;
      vo.region = raw.region;
      vo.province = raw.province;
      vo.city = raw.city;
      vo.building = raw.building;
      vo.floor = raw.floor;
      vo.status = raw.status;
      vo.gender = raw.gender;
      return vo;
    });

    return result;
  }

  async report(id: number, userId: number) {
    const reportEntity = new ReportEntity();
    reportEntity.status = ReportType.OPEN;
    reportEntity.reportedById = userId;
    reportEntity.restroomId = id;
    return this.reportRepo.save(reportEntity);
  }
}

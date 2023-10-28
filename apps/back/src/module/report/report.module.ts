import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportEntity } from '../../model/report.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReportEntity])],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}

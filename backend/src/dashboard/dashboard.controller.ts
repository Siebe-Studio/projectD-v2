import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}


  @Get('getStockSplitData')
  async getStockSplitData() {
    return await this.dashboardService.getStockSplitData();
  }

  @Get('getTotalStock')
  async getTotalStock() {
    return await this.dashboardService.getTotalStock();
  }
}

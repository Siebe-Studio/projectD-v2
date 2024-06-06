import { Controller, Get, Query } from '@nestjs/common';
import { LocationService } from './location.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Location')
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  findAll(@Query('vehicles') includeVehicles: boolean): any {
    return this.locationService.findAll(includeVehicles);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto, UpdateLocationDto } from './dto/location.dto';

import { ApiTags } from '@nestjs/swagger';
@ApiTags('locations')
@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.createLocation(createLocationDto);
  }

  @Get()
  findAll() {
    return this.locationService.getAllLocations();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.locationService.getLocationById(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLocationDto: UpdateLocationDto) {
    return this.locationService.updateLocation(Number(id), updateLocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.locationService.deleteLocation(Number(id));
  }
}
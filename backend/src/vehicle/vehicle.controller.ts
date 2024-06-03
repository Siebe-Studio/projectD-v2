import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { VehicleService } from 'src/vehicle/vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';

@ApiTags('Vehicle')
@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get()
  async findAll() {
    return this.vehicleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.vehicleService.findOne(id);
  }

  @Post()
  async create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehicleService.create(createVehicleDto);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateVehicleDto: CreateVehicleDto) {
    return this.vehicleService.update(id, updateVehicleDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.vehicleService.remove(id);
  }
}

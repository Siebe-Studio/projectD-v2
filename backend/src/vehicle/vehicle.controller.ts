import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto, UpdateVehicleDto } from './dto/vehicle.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('vehicles')
@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  create(@Body() createVehicleDto: CreateVehicleDto) {
    console.log('Create Vehicle DTO:', createVehicleDto);
    return this.vehicleService.create(createVehicleDto);
  }

  @Get()
  findAll() {
    console.log('Fetching all vehicles');
    return this.vehicleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log('Fetching vehicle with ID:', id);
    return this.vehicleService.findOne((id));  // Convert to number
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    console.log('Updating vehicle with ID:', id, 'with data:', updateVehicleDto);
    return this.vehicleService.update((id), updateVehicleDto);  // Convert to number
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    console.log('Deleting vehicle with ID:', id);
    return this.vehicleService.remove((id));  // Convert to number
  }
}

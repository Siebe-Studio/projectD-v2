import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  UseGuards,
} from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto, UpdateVehicleDto } from './dto/vehicle.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Roles } from 'src/auth/guards/roles.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Vehicles')
@Controller('vehicles')
export class VehicleController {
  private readonly logger = new Logger(VehicleController.name);

  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  @Roles('ADMIN')
  // @UseGuards(JwtGuard)
  async create(@Body() createVehicleDto: CreateVehicleDto) {
    this.logger.log('Creating vehicle with DTO:', createVehicleDto);
    try {
      return await this.vehicleService.create(createVehicleDto);
    } catch (error) {
      this.logger.error('Error in create vehicle controller', error);
      throw error;
    }
  }

  @Get()
  @Roles('ADMIN')
  // @UseGuards(JwtGuard)
  async findAll() {
    try {
      const vehicles = await this.vehicleService.findAll();
      this.logger.log('Found vehicles:', vehicles);
      return vehicles;
    } catch (error) {
      this.logger.error('Error in findAll vehicle controller', error);
      throw error;
    }
  }

  @Get(':id')
  @Roles('ADMIN')
  // @UseGuards(JwtGuard)
  async findOne(@Param('id') id: string) {
    try {
      return await this.vehicleService.findOne(id);
    } catch (error) {
      this.logger.error(`Error in findOne vehicle controller with id ${id}`, error);
      throw error;
    }
  }

  @Patch(':id')
  @Roles('ADMIN')
  // @UseGuards(JwtGuard)
  async update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    try {
      return this.vehicleService.update(id, updateVehicleDto);
    } catch (error) {
      this.logger.error(`Error in update vehicle controller with id ${id}`, error);
      throw error;
    }
  }

  @Delete(':id')
  @Roles('ADMIN')
  // @UseGuards(JwtGuard)
  async remove(@Param('id') id: string) {
    try {
      return this.vehicleService.remove(id);
    } catch (error) {
      this.logger.error(`Error in remove vehicle controller with id ${id}`, error);
      throw error;
    }
  }

  @Get(':vehicleId/items')
  async getItemsByVehicle(@Param('vehicleId') vehicleId: string) {
    return this.vehicleService.getItemsByVehicle(vehicleId);
  }

}

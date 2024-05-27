import {Controller,Get,Post,Put,Delete,Body,Param,ParseIntPipe,UseGuards} from '@nestjs/common';
  import { VehicleService } from 'src/vehicle/vehicle.service';
  import { JwtGuard } from 'src/auth/guards/jwt.guard';
  import { ApiTags, ApiBody } from '@nestjs/swagger';
  import { Roles } from 'src/auth/guards/roles.decorator';
  import { Vehicle as VehicleModel } from '@prisma/client';
  import { CreateVehicleDto } from "src/vehicle/dto/create-vehicle.dto";
  
  @ApiTags('Vehicle')
  @Controller('vehicle')
  export class VehicleController {
    constructor(private vehicleService: VehicleService) {}
  
    @Get(':id')
    @Roles('STOCKMANAGER')
    @UseGuards(JwtGuard)
    async getVehicle(@Param('id', ParseIntPipe) id: number): Promise<VehicleModel> {
      return this.vehicleService.findOne(id);
    }
  
  @Post()
  @Roles('STOCKMANAGER')
  @UseGuards(JwtGuard)
  @ApiBody({ type: CreateVehicleDto }) 
  async createVehicle(@Body() createVehicleDto: CreateVehicleDto): Promise<VehicleModel> {
    return this.vehicleService.create(createVehicleDto);
  }
  
  @Put(':id')
  @Roles('STOCKMANAGER')
  @UseGuards(JwtGuard)
  @ApiBody({ type: CreateVehicleDto }) 
  async updateVehicle(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVehicleDto: CreateVehicleDto
    ): Promise<VehicleModel> {
    return this.vehicleService.update(id, updateVehicleDto);
    }
  
    @Delete(':id')
    @Roles('STOCKMANAGER')
    @UseGuards(JwtGuard)
    async deleteVehicle(@Param('id', ParseIntPipe) id: number): Promise<VehicleModel> {
      return this.vehicleService.delete(id);
    }
  
    @Get()
    @Roles('STOCKMANAGER')
    @UseGuards(JwtGuard)
    async findAll(): Promise<VehicleModel[]> {
      return this.vehicleService.findAll();
    }
  }
  
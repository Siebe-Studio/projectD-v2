import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, Vehicle} from '@prisma/client';
import { CreateVehicleDto } from "src/vehicle/dto/create-vehicle.dto";

@Injectable()
export class VehicleService {
  constructor(private prisma: PrismaService) {}

  async create(createVehicleDto: CreateVehicleDto) {
    return this.prisma.vehicle.create({
      data: {
        location_id: createVehicleDto.location_id,
        plate: createVehicleDto.plate,
        description: createVehicleDto.description 
      },
    });
  }
  async findAll(): Promise<Vehicle[]> {
    return this.prisma.vehicle.findMany();
  }

  async findOne(id: number): Promise<Vehicle> {
    return this.prisma.vehicle.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateVehicleDto: CreateVehicleDto) {
    return this.prisma.vehicle.update({
      where: { id },
      data: {
        location_id: updateVehicleDto.location_id,
        plate: updateVehicleDto.plate,
        description: updateVehicleDto.description 
      },
    });
  }
  async delete(id: number): Promise<Vehicle> {
    return this.prisma.vehicle.delete({
      where: { id },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateVehicleDto, UpdateVehicleDto } from './dto/vehicle.dto';

@Injectable()
export class VehicleService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateVehicleDto) {
    return await this.prisma.vehicle.create({
      data: dto,
    });
  }

  async findAll() {
    return this.prisma.vehicle.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: string) {
    return await this.prisma.vehicle.findUnique({
      where: { id },
    });
  }

  async update(id: string, dto: UpdateVehicleDto) {
    return this.prisma.vehicle.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    return this.prisma.vehicle.delete({
      where: { id },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateVehicleDto, UpdateVehicleDto } from './dto/vehicle.dto';

@Injectable()
export class VehicleService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateVehicleDto) {
    return await this.prisma.vehicle.create({
      data: {
        plate: dto.plate,
        description: dto.description,
        location: {
          connect: {
            id: dto.location_id,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.vehicle.findMany({
      orderBy: { id: 'asc' },
      select: {
        id: true,
        plate: true,
        description: true,
        location_id: true,
      },
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
      data: {
        plate: dto.plate,
        description: dto.description,
        location: {
          connect: {
            id: dto.location_id,
          },
        },
      },
    });
  }

  async remove(id: string) {
    return this.prisma.vehicle.delete({
      where: { id },
    });
  }
  async getItemsByVehicle(vehicleId: string) {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id: vehicleId },
      include: {
        location: {
          include: {
            items: true,
          },
        },
      },
    });

    if (!vehicle) {
      // throw new NotFoundException('Vehicle not found');
    }

    return vehicle.location.items;
  }

}

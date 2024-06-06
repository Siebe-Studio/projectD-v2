import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  CreateVehicleDto,
  FillVehicleDto,
  TakeFromVehicleDto,
} from './dto/create-vehicle.dto';

@Injectable()
export class VehicleService {
  constructor(private prisma: PrismaService) {}

  async create(createVehicleDto: CreateVehicleDto) {
    return this.prisma.vehicle.create({
      data: createVehicleDto,
    });
  }

  async findAll() {
    return this.prisma.vehicle.findMany();
  }

  async findOne(id: number) {
    return this.prisma.vehicle.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateVehicleDto: CreateVehicleDto) {
    return this.prisma.vehicle.update({
      where: { id },
      data: updateVehicleDto,
    });
  }

  async remove(id: number) {
    return this.prisma.vehicle.delete({
      where: { id },
    });
  }

  async fill(id: number, data: FillVehicleDto) {
    console.log(data.items);

    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id },
      include: { items: true },
    });

    return this.prisma.vehicle.update({
      where: { id },
      data: {
        items: {
          connect: data.items.map((item) => ({ id: item.id })),
        },
      },
      include: {
        items: true,
      },
    });
  }

  async take(id: number, data: TakeFromVehicleDto) {
    console.log(data.items);

    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id },
      include: { items: true },
    });

    //remove location and location id from items

    return this.prisma.vehicle.update({
      where: { id },
      data: {
        items: {
          disconnect: data.items.map((item) => ({
            id: item.id,
          })),
        },
      },
      include: {
        items: true,
      },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateLocationDto, UpdateLocationDto } from './dto/location.dto';

@Injectable()
export class LocationService {
  constructor(private prisma: PrismaService) {}

  async createLocation(data: CreateLocationDto) {
    return this.prisma.location.create({
      data,
    });
  }

  async getAllLocations() {
    return this.prisma.location.findMany();
  }

  async getLocationById(id: number) {
    return this.prisma.location.findUnique({
      where: { id },
    });
  }

  async updateLocation(id: number, data: UpdateLocationDto) {
    return this.prisma.location.update({
      where: { id },
      data,
    });
  }

  async deleteLocation(id: number) {
    return this.prisma.location.delete({
      where: { id },
    });
  }
}

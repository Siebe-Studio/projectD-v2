import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LocationService {
  constructor(private prisma: PrismaService) {}

  findAll(includeVehicles?: boolean) {
    return this.prisma.location.findMany({
      select: {
        id: true,
        name: true,
        vehicles: includeVehicles,
      }
    });
  }
}

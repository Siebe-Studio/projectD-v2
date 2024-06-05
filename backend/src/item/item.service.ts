import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, Item } from '@prisma/client';
import { CreateItemDto, UpdateItemDto } from './dto/item.dto';

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}

  create(data: { productId: number, locationId: number }) : Promise<Item> {
    return this.prisma.item.create({
      data: {
        product: {
          connect: {
            id: data.productId,
          },
        },
        location: {
          connect: {
            id: data.locationId,
          },
        },
      },
    });
  }

  bulkCreate(data: { productId: number; locationId: number; quantity: number }): Promise<any> {
    const items = Array.from({ length: data.quantity }).map(() => ({
      productId: data.productId,
      locationId: data.locationId,
    }));

    return this.prisma.item.createMany({
      data: items,
    });
  }

  findAll(): Promise<any> {
    return this.prisma.item.findMany({
      include: {
        product: true,
        location: true,
      },
    });
  }

  findOne(id: string): Promise<Item> {
    return this.prisma.item.findUnique({
      where: {
        id,
      },
      include: {
        product: true,
        location: true,
      },
    });
  }

  update(id: string, data: UpdateItemDto): Promise<Item> {
    return this.prisma.item.update({
      where: {
        id,
      },
      data,
    });
  }

  remove(id: string): Promise<Item> {
    return this.prisma.item.delete({
      where: {
        id,
      },
    });
  }

  async assignItemToVehicle(itemId: string, vehicleId: string): Promise<Item> {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id: vehicleId },
      include: { location: true }
    });

    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    const updatedItem = await this.prisma.item.update({
      where: { id: itemId },
      data: { locationId: vehicle.location_id }
    });

    return updatedItem;
  }
}

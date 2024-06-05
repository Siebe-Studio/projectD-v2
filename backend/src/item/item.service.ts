import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, Item } from '@prisma/client';

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}

  async create(data: { productId: number; serialNumber: string }): Promise<Item> {
    return this.prisma.item.create({
      data: {
        serialNumber: data.serialNumber,
        product: {
          connect: {
            id: data.productId,
          },
        },
      },
    });
  }

  async bulkCreate(data: { productId: number; quantity: number }): Promise<any> {
    const items = Array.from({ length: data.quantity }).map(() => ({
      serialNumber: generateUniqueSerialNumber(),
      productId: data.productId,
    }));

    return this.prisma.item.createMany({
      data: items,
    });
  }

  async findAll(): Promise<Item[]> {
    return this.prisma.item.findMany({
      include: {
        product: true,
        history: true,  // Include history in the response
      },
    });
  }

  async findOne(id: string): Promise<Item> {
    const item = await this.prisma.item.findUnique({
      where: { id },
      include: {
        product: true,
        history: true,  // Include history in the response
      },
    });
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return item;
  }

  async update(id: string, data: Prisma.ItemUpdateInput): Promise<Item> {
    const item = await this.prisma.item.findUnique({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return this.prisma.item.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<Item> {
    const item = await this.prisma.item.findUnique({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return this.prisma.item.delete({
      where: { id },
    });
  }
}

// Utility function to generate a unique serial number
function generateUniqueSerialNumber(): string {
  return 'SN-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

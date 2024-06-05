import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  create(data: {
    name: string;
    description?: string;
    price: number;
    categoryId: number;
  }) {
    return this.prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        categoryId: data.categoryId,
      },
    });
  }

  findAll() {
    return this.prisma.product.findMany({
      include: {
        category: true,
        _count: { select: { items: true } },
      },
      orderBy: { id: 'desc' },
    });
  }

  findOne(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        items: true,
        _count: { select: { items: true } },
      },
    });
  }

  update(id: number, updateProductDto: any) {
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  // async assignProductToVehicle(productId: string, vehicleId: string) {
  //   const parsedProductId = parseInt(productId, 10);
  //   const parsedVehicleId = parseInt(vehicleId, 10);

  //   if (isNaN(parsedProductId) || isNaN(parsedVehicleId)) {
  //     throw new NotFoundException('Invalid product or vehicle ID');
  //   }

  //   const vehicle = await this.prisma.vehicle.findUnique({
  //     where: { id: parsedVehicleId },
  //     include: { location: true },
  //   });

  //   if (!vehicle) {
  //     throw new NotFoundException('Vehicle not found');
  //   }

  //   const items = await this.prisma.item.findMany({
  //     where: { productId: parsedProductId },
  //   });

  //   if (items.length === 0) {
  //     throw new NotFoundException('No items found for this product');
  //   }

  //   const updatedItems = await this.prisma.item.updateMany({
  //     where: { productId: parsedProductId },
  //     data: { locationId: vehicle.location_id },
  //   });

  //   return updatedItems;
  // }
}


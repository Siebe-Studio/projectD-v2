import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, Product } from '@prisma/client';

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
      include: {
        Category: true,  // Include the related category in the response
      },
    });
  }

  findAll() {
    return this.prisma.product.findMany({
      include: {
        Category: true,
        _count: { select: { items: true } },
      },
      orderBy: { id: 'desc' },
    });
  }

  findOne(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        Category: true,
        items: true,
      },
    });
  }

  update(id: number, updateProductDto: any) {
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
      include: {
        Category: true,
        items: true,
      },
    });
  }

  remove(id: number) {
    return this.prisma.product.delete({
      where: { id },
      include: {
        Category: true,
        items: true,
      },
    });
  }
}

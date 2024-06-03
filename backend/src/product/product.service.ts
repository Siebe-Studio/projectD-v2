import { Injectable } from '@nestjs/common';
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
      include: {
        category: true,
        items: true,
        _count: { select: { items: true } },
      }
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
}

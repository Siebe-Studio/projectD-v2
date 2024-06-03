import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        name: dto.name,
        description: dto.description,
        price: dto.price,
        categoryId: dto.categoryId,
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

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  remove(id: number, items: boolean) {
    return this.prisma.product.delete({
      where: { id },
      include: { items: items ? true : false },
    });
  }
}

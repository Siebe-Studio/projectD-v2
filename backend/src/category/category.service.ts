import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, Category } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.CategoryCreateInput): Promise<Category> {
    return this.prisma.category.create({
      data,
    });
  }

  async findAll(): Promise<Category[]> {
    return this.prisma.category.findMany();
  }

  async findOne(id: number): Promise<Category> {
    return this.prisma.category.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, data: Prisma.CategoryUpdateInput): Promise<Category> {
    return this.prisma.category.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: number): Promise<Category> {
    return this.prisma.category.delete({
      where: {
        id,
      },
    });
  }
}

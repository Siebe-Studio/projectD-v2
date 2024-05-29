
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, Product } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  create(data) {
    return this.prisma.product.create({
      data,
    });
  }

  findAll() {
    return this.prisma.product.findMany({
      include: {
        Category: true,
        items: true,
      },
      orderBy: { id: 'desc' }, // Assuming 'id' is the primary key column
    });
  }
  

  findOne(id: number) {
    // Implement logic to find product by ID using Prisma query
    return `This action returns a #${id} product (placeholder)`;
  }

  update(id: number, updateProductDto: any) {
    // Implement logic to update product by ID using Prisma query
    return `This action updates a #${id} product (placeholder)`;
  }

  remove(id: number) {
    // Implement logic to delete product by ID using Prisma query
    return `This action removes a #${id} product (placeholder)`;
  }
}

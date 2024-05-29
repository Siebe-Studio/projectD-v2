import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, Product } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async seed(): Promise<void> {
    try {
      await this.prisma.product.createMany({
        data: [
          { 
            id: 1,
            name: 'Product 1', 
            description: 'Description of Product 1', 
            price: 19.99, 
            categoryId: 1 
          },
          { 
            id: 2,
            name: 'Product 2', 
            description: 'Description of Product 2', 
            price: 29.99, 
            categoryId: 2 
          },
          { 
            id: 3,
            name: 'Product 3', 
            description: 'Description of Product 3', 
            price: 39.99, 
            categoryId: 1 
          },
          // Add more product objects as needed
        ],
      });

      console.log('Products have been seeded.');
    } catch (error) {
      console.error('Error seeding products:', error);
      throw error; // Rethrow the error to handle it in the caller
    }
  }

  create(data): Promise<Product> {
    return this.prisma.product.create({
      data,
    });
  }

  findAll(): Promise<Product[]> {
    return this.prisma.product.findMany({
      include: {
        Category: true,
        items: true,
      },
      orderBy: { id: 'desc' }, // Assuming 'id' is the primary key column
    });
  }
  

  findOne(id: number): Promise<Product> {
    // Implement logic to find product by ID using Prisma query
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        Category: true,
        items: true,
      },
    });
  }

  update(id: number, updateProductDto: any): Promise<Product> {
    // Implement logic to update product by ID using Prisma query
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
      include: {
        Category: true,
        items: true,
      },
    });
  }

  remove(id: number): Promise<Product> {
    // Implement logic to delete product by ID using Prisma query
    return this.prisma.product.delete({
      where: { id },
      include: {
        Category: true,
        items: true,
      },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

// Define the Product type outside of the class
type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  Category: { // Use Category with a capital letter
    id: number;
    name: string;
  };
  _count: {
    items: number;
  };
};

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  create(data: {
    name: string;
    description?: string;
    price: number;
    categoryId: number;
  }): Promise<Product> {
    return this.prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        Category: { connect: { id: data.categoryId } }, // Adjusted to use Prisma relationship creation syntax
      },
      include: { Category: true, _count: { select: { items: true } } },
    }) as Promise<Product>;
  }
  
  

  findAll(): Promise<Product[]> {
    return this.prisma.product.findMany({
      include: { Category: true, _count: { select: { items: true } } }, // Use Category with a capital letter
      orderBy: { id: 'desc' },
    }) as Promise<Product[]>;
  }

  findOne(id: number): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: { id },
      include: { Category: true, _count: { select: { items: true } } }, // Use Category with a capital letter
    }) as Promise<Product | null>;
  }

  update(id: number, updateProductDto: any): Promise<Product> {
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
      include: {
        Category: true, // Use Category with a capital letter
        _count: { select: { items: true } },
      },
    }) as Promise<Product>;
  }

  remove(id: number): Promise<Product> {
    return this.prisma.product.delete({
      where: { id },
      include: {
        Category: true, // Use Category with a capital letter
        _count: { select: { items: true } },
      },
    }) as Promise<Product>;
  }
}

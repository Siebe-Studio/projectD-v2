import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProductDto } from './dto/product.dto';
import { Product as ProductModel } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateProductDto){
    try {
      const newProduct = await this.prisma.product.create({
        data: dto,
      });
      return newProduct;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Product with this name already exists');
      } else {
        throw error;
      }
    }
  }

  async findById(id: string){
    const product = await this.prisma.product.findUnique({
      where: { id: Number(id) },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async findByCategory(categoryId: number){
    return this.prisma.product.findMany({
      where: { categoryId },
    });
  }

  async update(id: string, dto: CreateProductDto): Promise<ProductModel> {
    try {
      await this.findById(id); 
      return this.prisma.product.update({
        where: { id: Number(id) },
        data: dto,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Product with this name already exists');
      } else {
        throw error;
      }
    }
  }

  async delete(id: string): Promise<ProductModel> {
    const product = await this.findById(id); 
    await this.prisma.product.delete({ where: { id: Number(id) } });
    return product; 
  }

  async findAll(): Promise<ProductModel[]> {
    return this.prisma.product.findMany();
  }
}

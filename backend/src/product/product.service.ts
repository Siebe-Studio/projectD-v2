import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  create(createProductDto: any) {
    return 'This action adds a new product';
  }

  findAll() {
    return this.prisma.product.findMany({
      include: {
        category: true,
        _count: { select: { items: true }}
      },
      orderBy: { id: 'desc'},
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: any) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}

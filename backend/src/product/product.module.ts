import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt'

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService, JwtService],
})
export class ProductModule {}

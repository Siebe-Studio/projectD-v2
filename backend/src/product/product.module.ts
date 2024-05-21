import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaService } from '../prisma.service'; // Adjust the path if needed

@Module({
  imports: [JwtModule], // Import JwtModule here
  providers: [ProductService, PrismaService],
  controllers: [ProductController]
})
export class ProductModule {}

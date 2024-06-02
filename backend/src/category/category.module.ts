import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CategoryController } from './category.controller';



@Module({
  providers: [CategoryService, PrismaService, JwtService],
  controllers: [CategoryController]
})
export class CategoryModule {}

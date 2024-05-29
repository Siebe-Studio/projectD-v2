import {
  Controller,
  Get,
  UseGuards,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/guards/roles.decorator';
import { Category as CategoryModel, Prisma } from '@prisma/client';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get(':id')
  @Roles('STOCKMANAGER')
  @UseGuards(JwtGuard)
  async getCategory(@Param('id', ParseIntPipe) id: number): Promise<CategoryModel> {
    return await this.categoryService.findOne(id);
  }

  @Post(':id')
  @Roles('STOCKMANAGER')
  @UseGuards(JwtGuard)
  async updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Prisma.CategoryUpdateInput,
  ): Promise<CategoryModel> {
    return await this.categoryService.update(id, dto);
  }

  @Get()
  @Roles('STOCKMANAGER')
  @UseGuards(JwtGuard)
  async getCategories(): Promise<CategoryModel[]> {
    return await this.categoryService.findAll();
  }

  @Post()
  @Roles('STOCKMANAGER')
  @UseGuards(JwtGuard)
  async createCategory(@Body() dto: Prisma.CategoryCreateInput): Promise<CategoryModel> {
    return await this.categoryService.create(dto);
  }

  @Delete(':id')
  @Roles('STOCKMANAGER')
  @UseGuards(JwtGuard)
  async deleteCategory(@Param('id', ParseIntPipe) id: number): Promise<CategoryModel> {
    return await this.categoryService.delete(id);
  }
}

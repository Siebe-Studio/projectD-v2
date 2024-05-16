import {
  Controller,
  Get,
  UseGuards,
  Param,
  ParseIntPipe,
  Post,
  Body,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/guards/roles.decorator';
import { Category as CategoryModel } from '@prisma/client';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private userService: CategoryService) {}

  @Get(':id')
  @Roles('STOCKMANAGER')
  @UseGuards(JwtGuard)
  async getCategory(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.findOne(id);
  }
  
  @Post()
  @Roles('STOCKMANAGER')
  @UseGuards(JwtGuard)
  async createCategory(@Body() dto: { name: string }): Promise<CategoryModel> {
    return await this.userService.create(dto);
  }
}

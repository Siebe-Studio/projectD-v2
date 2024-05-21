import {
    Controller,
    Get,
    UseGuards,
    Param,
    ParseIntPipe,
    Post,
    Body,
    Delete,
    Put,
  } from '@nestjs/common';
  import { ProductService } from './product.service';
  import { JwtGuard } from 'src/auth/guards/jwt.guard';
  import { ApiTags } from '@nestjs/swagger';
  import { Roles } from 'src/auth/guards/roles.decorator';
  import { Product as ProductModel } from '@prisma/client';
  import { CreateProductDto } from './dto/product.dto';
  
  @ApiTags('Product')
  @Controller('product')
  export class ProductController {
    constructor(private productService: ProductService) {}
  
    @Get(':id')
    @Roles('STOCKMANAGER')
    @UseGuards(JwtGuard)
    async getProduct(@Param('id') id: string): Promise<ProductModel> {
      return await this.productService.findById(id);
    }
  
    @Post(':id')
    @Roles('STOCKMANAGER')
    @UseGuards(JwtGuard)
    async updateProduct(
      @Param('id') id: string,
      @Body() dto: CreateProductDto,
    ): Promise<ProductModel> {
      return await this.productService.update(id, dto);
    }
  
    @Get()
    @Roles('STOCKMANAGER')
    @UseGuards(JwtGuard)
    async getProducts(): Promise<ProductModel[]> {
      return await this.productService.findAll();
    }
  
    @Post()
    @Roles('STOCKMANAGER')
    @UseGuards(JwtGuard)
    async createProduct(@Body() dto: CreateProductDto): Promise<ProductModel> {
      return await this.productService.create(dto);
    }
  
    @Delete(':id')
    @Roles('STOCKMANAGER')
    @UseGuards(JwtGuard)
    async deleteProduct(@Param('id') id: string): Promise<ProductModel> {
      return await this.productService.delete(id);
    }
  }
  
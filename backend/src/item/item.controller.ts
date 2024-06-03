import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/guards/roles.decorator';
import { CreateItemDto, UpdateItemDto } from './dto/item.dto';

@ApiTags('Item')
@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  @Roles('STOCKMANAGER')
  @UseGuards(JwtGuard)
  create(@Body() data: { productId: number, locationId: number}) {
    return this.itemService.create(data);
  }

  @Post('bulk')
  @Roles('STOCKMANAGER')
  @UseGuards(JwtGuard)
  bulkCreate(@Body() data: { productId: number; location_id: number; quantity: number }) {
    return this.itemService.bulkCreate(data);
  }

  @Get()
  @Roles('STOCKMANAGER')
  @UseGuards(JwtGuard)
  findAll() {
    return this.itemService.findAll();
  }

  @Get(':id')
  @Roles('STOCKMANAGER')
  @UseGuards(JwtGuard)
  findOne(@Param('id') id: string) {
    return this.itemService.findOne(id);
  }

  @Patch(':id')
  @Roles('STOCKMANAGER')
  @UseGuards(JwtGuard)
  update(@Param('id') id: string, @Body() data: UpdateItemDto) {
    return this.itemService.update(id, data);
  }

  @Delete(':id')
  @Roles('STOCKMANAGER')
  @UseGuards(JwtGuard)
  remove(@Param('id') id: string) {
    return this.itemService.remove(id);
  }
}

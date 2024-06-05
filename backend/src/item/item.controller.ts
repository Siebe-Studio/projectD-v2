import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put, NotFoundException } from '@nestjs/common';
import { ItemService } from './item.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/guards/roles.decorator';
import { CreateItemDto, UpdateItemDto } from './dto/item.dto';

@ApiTags('Item')
@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}


  @Get()
  @Roles('STOCKMANAGER')
  // @UseGuards(JwtGuard)
  findAll() {
    return this.itemService.findAll();
  }

  @Post()
  @Roles('STOCKMANAGER')
  // @UseGuards(JwtGuard)
  create(@Body() data: { productId: number, locationId: number}) {
    return this.itemService.create(data);
  }

  @Post('bulk')
  @Roles('STOCKMANAGER')
  // @UseGuards(JwtGuard)
  bulkCreate(@Body() data: { productId: number; locationId: number; quantity: number }) {
    return this.itemService.bulkCreate(data);
  }

  @Get(':id')
  @Roles('STOCKMANAGER')
  // @UseGuards(JwtGuard)
  findOne(@Param('id') id: string) {
    return this.itemService.findOne(id);
  }

  @Patch(':id')
  @Roles('STOCKMANAGER')
  // @UseGuards(JwtGuard)
  update(@Param('id') id: string, @Body() data: UpdateItemDto) {
    return this.itemService.update(id, data);
  }

  @Delete(':id')
  @Roles('STOCKMANAGER')
  // @UseGuards(JwtGuard)
  remove(@Param('id') id: string) {
    return this.itemService.remove(id);
  }

  @Put(':itemId/assign-to-vehicle/:vehicleId')
  @Roles('STOCKMANAGER')
  // @UseGuards(JwtGuard)
  async assignItemToVehicle(
    @Param('itemId') itemId: string,
    @Param('vehicleId') vehicleId: string,
  ) {
    try {
      const updatedItem = await this.itemService.assignItemToVehicle(itemId, vehicleId);
      return updatedItem;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}

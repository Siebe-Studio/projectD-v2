import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  UseGuards,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/guards/roles.decorator';
import { Prisma } from '@prisma/client';
import { HistoryController } from 'src/history/history.controller';
import { CreateHistoryDto } from '../history/dto/create-history.dto';
import { HistoryService } from '../history/history.service';
import { UpdateItemDto } from './dto/item.dto';

@ApiTags('Item')
@Controller('item')
export class ItemController {
  constructor(
    private readonly itemService: ItemService,
    private readonly historyService: HistoryService // Gebruik de service, niet de controller
  ) {}

  @Post()
  async create(@Body() data: { productId: number; locationId: number }, userId: string) {
    // Aanmaken van een nieuw item
    const newItem = await this.itemService.create(data);

    // Aanmaken van een nieuw history record
    const createHistoryDto = new CreateHistoryDto();
    createHistoryDto.title = 'CREATED';
    createHistoryDto.description = `Item with ID ${newItem.id} was created in ${data.locationId.toString()}.`;
    createHistoryDto.itemId = newItem.id.toString();
    createHistoryDto.userId = userId;

    await this.historyService.create(createHistoryDto);

    return newItem;
  }

  @Post('bulk')
  bulkCreate(@Body() data: { productId: number; quantity: number, locationId: number}) {
    return this.itemService.bulkCreate(data);
  }

  @Get()
  findAll() {
    return this.itemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,@Body() data: {locationId: number, userId: string}, 
  ) {
    // Zodra locatie update, nieuwe history toevoegen zodra locatie veranderd
    // Zodra de locatie anders is nieuwe hsitory aanmaken
    // Eerst oude locatie ophalen
    const item = await this.itemService.findOne(id);

    // Aanmaken van een nieuw history record
    const createHistoryDto = new CreateHistoryDto();
    createHistoryDto.title = 'MOVED';
    createHistoryDto.description = `Item with ID ${id} was moved to ${data.locationId}, from ${((await item).locationId)} .`;
    createHistoryDto.itemId = id.toString();
    createHistoryDto.userId = data.userId;

    await this.historyService.create(createHistoryDto);

    const updateItem = this.itemService.update(id, data.locationId);
    return updateItem;
  }

  @Delete(':id')
  async remove(@Param('id') id: string, userId: string) {
    // history aanpassen
    const item = this.itemService.findOne(id);

    // Aanmaken van een nieuw history record
    const createHistoryDto = new CreateHistoryDto();
    createHistoryDto.title = 'DELETED';
    createHistoryDto.description = `Item with ID ${id} was deleted, from ${((await item).locationId)} .`;
    createHistoryDto.itemId = id.toString();
    createHistoryDto.userId = userId;

    return this.itemService.remove(id);
  }
}

import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { PrismaService } from 'src/prisma.service';
import { HistoryService } from 'src/history/history.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ItemController],
  providers: [ItemService, PrismaService, JwtService, HistoryService],
})
export class ItemModule {}

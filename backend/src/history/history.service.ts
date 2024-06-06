import { Injectable } from '@nestjs/common';
import { CreateHistoryDto } from './dto/create-history.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class HistoryService {
  constructor(private prisma: PrismaService) {}
  
  create(dto: CreateHistoryDto) {
    return this.prisma.history.create({
      data: {
        title: dto.title,
        description: dto.description,
        userId: dto.userId,
        itemId: dto.itemId,
      }
    });
  }

  findAll() {
    return `This action returns all history`;
  }

  findOne(id: number) {
    return `This action returns a #${id} history`;
  }

  update(id: number) {
    return `This action updates a #${id} history`;
  }

  remove(id: number) {
    return `This action removes a #${id} history`;
  }
}

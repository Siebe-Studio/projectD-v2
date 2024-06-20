import { Injectable } from '@nestjs/common';
import { CreateHistoryDto, UpdateHistoryDto } from './dto/create-history.dto';
import { PrismaService } from 'src/prisma.service';
import { boolean } from 'zod';

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
      },
    });
  }

  findAll(includeItem?: boolean) {
    return this.prisma.history.findMany({
      include: {
        item: includeItem,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.history.findUnique({
      where: { id: id },
    });
  }

  update(id: number, dto: UpdateHistoryDto) {
    return this.prisma.history.update({
      where: { id: id },
      data: {
        title: dto.title,
        description: dto.description,
        userId: dto.userId,
      },
    });
  }

  remove(id: number) {
    const history = this.prisma.history.findUnique({ where: { id } });
    if (!history) {
      throw new Error('Record to delete does not exist.');
    }
    return this.prisma.history.delete({ where: { id } });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getStockSplitData() {
    return await this.prisma.location.findMany({
      include: {
        locationType: true,
        _count: { select: { items: true } },
      },
    });
  }

  async getTotalStock() {
    const total = await this.prisma.item.aggregate({
      _count: { id: true },
    });

    return total._count.id;
  }
}

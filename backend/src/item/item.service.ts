import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, Item } from '@prisma/client';


@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}

  create(data: { productId: number, locationId: number }) : Promise<Item> {
    return this.prisma.item.create({
      data: {
        product: {
          connect: {
            id: data.productId,
          },
        },
        location: {
          connect: {
            id: data.locationId,
          },
        },
      },
    });
  }


  bulkCreate(data: { productId: number, quantity: number, locationId: number }) : Promise<any> {
    const items = Array.from({ length: data.quantity }).map(() => ({
      productId: data.productId,
      locationId: data.locationId,
    }));

    return this.prisma.item.createMany({
      data: items,
    });
  }


  findAll() : Promise<any> {
    return this.prisma.item.findMany({
      include: {
        product: true,
      },
    })
  }

  findOne(id: string) : Promise<Item> {
    return this.prisma.item.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, data: Prisma.ItemUpdateInput) : Promise<Item> {
    return this.prisma.item.update({
      where: {
        id,
      },
      data,
    })
  }


  remove(id: string) : Promise<Item> {
    return this.prisma.item.delete({
      where: {
        id,
      },
    });
  }
}

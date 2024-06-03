import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateAdressDto, UpdateAdressDto } from './dto/adress.dto';

@Injectable()
export class AdressService {
  constructor(private prisma: PrismaService) {}

  async createAdress(data: CreateAdressDto) {
    return this.prisma.adress.create({
      data: {
        street: data.street,
        number: data.number,
        city: data.city,
        state: data.state,
        zip: data.zip,
        phone: data.phone,
        location: {
          connect: {
            id: data.locationId,
          },
        },
      },
    });
  }

  async getAllAdresses() {
    return this.prisma.adress.findMany();
  }

  async getAdressById(id: number) {
    return this.prisma.adress.findUnique({
      where: { id },
    });
  }

  async updateAdress(id: number, data: UpdateAdressDto) {
    return this.prisma.adress.update({
      where: { id },
      data,
    });
  }

  async deleteAdress(id: number) {
    return this.prisma.adress.delete({
      where: { id },
    });
  }
}

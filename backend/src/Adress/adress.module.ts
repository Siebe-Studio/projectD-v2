import { Module } from '@nestjs/common';
import { LocationService } from 'src/location/location.service';
import { LocationController } from 'src/location/location.controller';
import { AdressService } from './adress.service';
import { AdressController } from './adress.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt'

@Module({
  controllers: [LocationController, AdressController],
  providers: [LocationService, AdressService, PrismaService, JwtService],
})
export class LocationModule {}

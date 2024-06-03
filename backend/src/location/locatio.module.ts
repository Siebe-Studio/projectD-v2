import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { PrismaService } from 'src/prisma.service'; 
import { JwtService } from '@nestjs/jwt';
@Module({
  providers: [LocationService, PrismaService, JwtService ],
  controllers: [LocationController],
})
export class LocationModule {}

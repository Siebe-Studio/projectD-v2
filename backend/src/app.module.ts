import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CategoryController } from './category/category.controller';
import { CategoryModule } from './category/category.module';
import { CategoryService } from './category/category.service';
import { JwtService } from '@nestjs/jwt';
import { ItemModule } from './item/item.module';
import { ProductModule } from './product/product.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { LocationService } from './location/location.service';
import { LocationController } from './location/location.controller';
import { LocationModule } from './location/locatio.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, AuthModule, CategoryModule, ItemModule, ProductModule, VehicleModule, LocationModule, LocationModule],
  controllers: [AppController, CategoryController, LocationController],
  providers: [AppService, PrismaService, JwtService, CategoryService, LocationService],
})
export class AppModule {}

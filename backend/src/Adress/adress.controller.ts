import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdressService } from './adress.service';
import { CreateAdressDto, UpdateAdressDto } from './dto/adress.dto';

@Controller('adresses')
export class AdressController {
  constructor(private readonly adressService: AdressService) {}

  @Post()
  create(@Body() createAdressDto: CreateAdressDto) {
    return this.adressService.createAdress(createAdressDto);
  }

  @Get()
  findAll() {
    return this.adressService.getAllAdresses();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adressService.getAdressById(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdressDto: UpdateAdressDto) {
    return this.adressService.updateAdress(Number(id), updateAdressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adressService.deleteAdress(Number(id));
  }
}

import { IsString, IsInt, IsOptional, IsArray, isNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVehicleDto {
  @ApiProperty()
  @IsInt()
  @IsOptional()
  id: number;

  @ApiProperty()
  @IsString()
  plate: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsInt()
  locationId: number;
}

export class FillVehicleDto {
  @ApiProperty()
  @IsArray()
  items: ItemDTO[];
}


export class TakeFromVehicleDto {
  @ApiProperty()
  @IsArray()
  items: ItemDTO[];
}


class ItemDTO {
  @ApiProperty()
  @IsString()
  id: string;
};

import { IsString, IsInt, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVehicleDto {
  @ApiProperty()
  @IsInt()
  location_id: number;

  @ApiProperty()
  @IsString()
  plate: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;
}
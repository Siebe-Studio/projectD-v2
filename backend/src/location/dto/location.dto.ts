import { IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLocationDto {
  @ApiProperty()
  @IsString()
  name: string;

  @IsInt()
  locationTypeId: number;
}

export class UpdateLocationDto {
  @ApiProperty()
  @IsString()
  name: string;

  @IsInt()
  locationTypeId: number;
}
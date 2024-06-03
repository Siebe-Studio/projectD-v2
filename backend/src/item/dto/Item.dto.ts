import { IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateItemDto {
  @ApiProperty()
  @IsInt()
  productId: number;

  @ApiProperty()
  @IsInt()
  location_id: number;
}

export class UpdateItemDto {
  @ApiProperty()
  @IsInt()
  @IsOptional()
  productId?: number;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  location_id?: number;
}


import { IsInt, IsNumber, IsOptional, IsString, isDate, isDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateHistoryDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  userId?: string;

  @ApiProperty()
  @IsString()
  itemId: string;

  @ApiProperty()
  @Type(() => Date)
  @IsOptional()
  date?: string;
}

export class UpdateHistoryDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  userId?: string;
}

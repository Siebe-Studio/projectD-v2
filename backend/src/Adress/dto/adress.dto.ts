import { IsInt, IsString } from 'class-validator';

export class CreateAdressDto {
  @IsString()
  street: string;

  @IsString()
  number: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  zip: string;

  @IsString()
  phone: string;

  @IsInt()
  locationId: number;
}

export class UpdateAdressDto {
  @IsString()
  street?: string;

  @IsString()
  number?: string;

  @IsString()
  city?: string;

  @IsString()
  state?: string;

  @IsString()
  zip?: string;

  @IsString()
  phone?: string;

  @IsInt()
  locationId?: number;
}

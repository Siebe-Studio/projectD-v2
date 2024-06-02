import { IsEmail, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto {
    @ApiProperty()
    @IsString()
    name: string;
}

export class UpdateCategoryDto {
    @ApiProperty()
    @IsString()
    name: string;
}
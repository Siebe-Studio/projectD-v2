import { IsInt, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateHistoryDto {
    @ApiProperty()
    @IsString()
    title: string;
    
    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsString()
    userId: string;

    @ApiProperty()
    @IsString()
    itemId: string;
}

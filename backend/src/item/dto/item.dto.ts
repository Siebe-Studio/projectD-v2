import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class UpdateItemDto {
    @ApiProperty()
    @IsNumber()
    locationId: number;
}
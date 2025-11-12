import { ApiProperty } from "@nestjs/swagger";
import { isArray, IsArray, IsNumber, IsPositive, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class FavoritoDto {

    @ApiProperty()
    @IsArray()    
    @Type(()=>Number)
    pokemonesIds: number[];

    @ApiProperty()
    @IsNumber()
    @IsPositive()
    usuarioId: number;

    
}

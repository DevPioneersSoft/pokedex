import { ApiProperty } from "@nestjs/swagger";
import { pokemon } from "generated/prisma/client";
import {IsNotEmpty, IsNumber, IsPositive, IsString} from 'class-validator'
import { tipo_pokemon } from "generated/prisma/client";

export class TipoPokemon implements tipo_pokemon{

    @ApiProperty()
    @IsNumber()
    id: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    nombre: string;

}

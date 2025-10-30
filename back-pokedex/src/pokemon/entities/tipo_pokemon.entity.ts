import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import type { tipo_pokemon } from "generated/prisma/client";

export class TipoPokemon implements tipo_pokemon {

    @ApiProperty()
    @IsNumber()
    id: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    nombre: string;
}

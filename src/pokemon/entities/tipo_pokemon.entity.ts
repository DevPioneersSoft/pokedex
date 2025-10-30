import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive, IsString, IsUrl } from "class-validator";
import { pokemon, tipo_pokemon } from "generated/prisma/client";

export class TipoPokemon implements tipo_pokemon {

    @IsNumber()
    @IsPositive()
    id: number;

    @IsString()
    @IsNotEmpty()
    nombre: string;

   

}

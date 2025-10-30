import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive, IsString, IsUrl } from "class-validator";
import type { pokemon } from "generated/prisma/client";

export class Pokemon implements pokemon {

    @ApiProperty()
    @IsNumber()
    id: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    descripcion: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    grunido: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsUrl()
    imagen: string;

    @ApiProperty()
    @IsNumber()
    @IsPositive()
    vida: number;

    @ApiProperty()
    @IsNumber()
    @IsPositive()
    ataque: number;

    @ApiProperty()
    @IsNumber()
    @IsPositive()
    defensa: number;

    @ApiProperty()
    @IsNumber()
    @IsPositive()
    ataqueEspecial: number;

    @ApiProperty()
    @IsNumber()
    @IsPositive()
    defensaEspecial: number;

    @ApiProperty()
    @IsNumber()
    @IsPositive()
    velocidad: number;
}

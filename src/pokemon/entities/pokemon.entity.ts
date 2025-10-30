import { ApiProperty } from "@nestjs/swagger";
import { pokemon } from "generated/prisma/client";
import {IsNotEmpty, IsNumber, IsPositive, IsString} from 'class-validator'

export class Pokemon implements pokemon{

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

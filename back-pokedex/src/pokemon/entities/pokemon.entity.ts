import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, isNumber, IsNumber, IsPositive, IsString, IsUrl, isURL } from "class-validator";
import { pokemon } from "generated/prisma/client";


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
    descripcion: string;

    @ApiProperty()
    @IsString()
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

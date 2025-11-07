import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive, IsString, IsUrl } from "class-validator";
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
    @IsNotEmpty()
    descripcion: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    gruñido: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsUrl()
    imagen: string;

    @ApiProperty()
    @IsNumber()
    vida: number;

    @ApiProperty()
    @IsNumber()
    ataque: number;

    @ApiProperty()
    @IsNumber()
    defensa: number;

    @ApiProperty()
    @IsNumber()
    ataqueEspecial: number;

    @ApiProperty()
    @IsNumber()
    defensaEspecial: number;

    @ApiProperty()
    @IsNumber()
    @IsPositive()
    velocidad: number;

}

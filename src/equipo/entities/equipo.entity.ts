import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { equipo } from "generated/prisma/browser";

export class Equipo implements equipo{    

    @ApiProperty()
    @IsNumber()
    id: number;

    @ApiProperty()
    @IsNumber()
    id_usuario: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    nombre: string;
}

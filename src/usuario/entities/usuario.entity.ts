import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { usuario } from "generated/prisma/browser";

export class Usuario implements usuario{
    
    @ApiProperty()
    @IsNumber()
    id: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    contrasena: string;
}

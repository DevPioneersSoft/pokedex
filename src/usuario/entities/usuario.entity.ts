import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { usuario } from "generated/prisma/client";


export class Usuario implements usuario{
    @ApiProperty()
    @IsNumber()
    id

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    username

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    contrasena

}

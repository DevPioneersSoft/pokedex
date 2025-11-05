import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsNotEmpty } from "class-validator";
import { usuario } from "generated/prisma/client";


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
        contrasena: string;
}

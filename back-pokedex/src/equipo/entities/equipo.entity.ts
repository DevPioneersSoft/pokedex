import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsNotEmpty } from "class-validator";

export class Equipo {
        @ApiProperty()
        @IsNumber()
        @IsNotEmpty()
        A: number;
    
        @ApiProperty()
        @IsNumber()
        @IsNotEmpty()
        B: number;
}


import { IsArray, IsInt, IsString } from "class-validator";

export class EquipoDto{
    @IsArray()
        @IsInt({each:true})
        pokemones:number[];
    
        @IsInt()
        userId:number;

        @IsString()
        nombreEquipo
}
import { ApiProperty } from "@nestjs/swagger";
import { Equipo } from "../entities/equipo.entity";
import { IsArray, IsNotEmpty, IsNumber, IsPositive, IsString, ValidateNested } from "class-validator";
import { Pokemon } from "src/pokemon/entities/pokemon.entity";
import { Type } from "class-transformer";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { ConnectPokemonDto } from "./connect.pokemon.dto";
import { ConnectUsuarioDto } from "./connect.usuario.dto";

export class EquipoPruebaDto{


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

    @ApiProperty()    
    @IsNumber()
    @IsPositive()
    numeroEquipo: number;

	@ApiProperty()
    @IsArray()
    @ValidateNested({each:true})
    @Type(()=>Number)
    pokemones: Number[]
}
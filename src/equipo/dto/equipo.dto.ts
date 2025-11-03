import { ApiProperty } from "@nestjs/swagger";
import { Equipo } from "../entities/equipo.entity";
import { IsArray, ValidateNested } from "class-validator";
import { Pokemon } from "src/pokemon/entities/pokemon.entity";
import { Type } from "class-transformer";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { ConnectPokemonDto } from "./connect.pokemon.dto";
import { ConnectUsuarioDto } from "./connect.usuario.dto";

export class EquipoDto extends Equipo{

    @ApiProperty()
    @IsArray()
    @ValidateNested({each:true})
    @Type(()=>Pokemon)
    pokemones: Pokemon[]

    @ApiProperty()    
    @ValidateNested()
    @Type(()=>Usuario)
    usuario: Usuario
}
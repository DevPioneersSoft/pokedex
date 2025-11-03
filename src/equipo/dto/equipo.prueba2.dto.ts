import { ApiProperty } from "@nestjs/swagger";
import { Equipo } from "../entities/equipo.entity";
import { IsArray, IsNotEmpty, IsNumber, IsPositive, IsString, ValidateNested } from "class-validator";
import { Pokemon } from "src/pokemon/entities/pokemon.entity";
import { Type } from "class-transformer";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { ConnectPokemonDto } from "./connect.pokemon.dto";
import { ConnectUsuarioDto } from "./connect.usuario.dto";

export class EquipoPrueba2Dto{

  @ApiProperty()
  @IsString()
  @IsNotEmpty() 
  nombre: string;

  @ApiProperty()
  @IsNumber()
  id_usuario: number;

  @ApiProperty({ type: [Number] })
  @IsArray()
  @IsNumber({}, { each: true })
  pokemones: number[];
}
import { ApiProperty } from "@nestjs/swagger";
import { Pokemon } from "../entities/pokemon.entity";
import { TipoPokemon } from "../entities/tipo.pokemon.entity";
import { IsArray, ValidateNested } from "class-validator";
import {Type} from 'class-transformer'


export class PokemonDto extends Pokemon{
    @ApiProperty()
    @IsArray()
    @ValidateNested()
    @Type(()=>TipoPokemon)// le especificas cual es la transformacion
    tipo_pokemon: TipoPokemon[]

}
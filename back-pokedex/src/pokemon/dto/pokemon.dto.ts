import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, ValidateNested } from "class-validator";
import { Pokemon } from "../entities/pokemon.entity";
import { TipoPokemon } from "../entities/tipo_pokemon.entity";

export class PokemonDto extends Pokemon {

    @ApiProperty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => TipoPokemon)
    tipoPokemon: TipoPokemon[]
}

import { ApiProperty } from "@nestjs/swagger";
import { Pokemon } from "../entities/pokemon.entity";
import { TipoPokemon } from "../entities/tipo_pokemon.entity";
import { IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { Usuario } from "src/usuario/entities/usuario.entity";

export class PokemonDto extends Pokemon {

    @ApiProperty()
    @IsArray()
    @ValidateNested({each:true})
    @Type(()=>TipoPokemon)
    tipoPokemon: TipoPokemon[]

    @ApiProperty()
    @IsArray()
    @ValidateNested({each:true})
    @Type(()=>Usuario)
    usuariosFavoritos: Usuario[]
}

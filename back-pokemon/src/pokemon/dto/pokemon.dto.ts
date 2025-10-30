import { ApiProperty } from "@nestjs/swagger";
import { TipoPokemon } from "../entities/tipo_pokemon.entity";
import { Type } from 'class-transformer';

export class PokemonDto {
	@ApiProperty({ description: "ID del Pokémon" })
	id: number;
	@ApiProperty({ description: "Número del Pokémon" })
	numero: number;
	@ApiProperty({ description: "Nombre del Pokémon" })
	nombre: string;
    @ApiProperty({ description: "Descripción del Pokémon" })
	descripcion: string;
    @ApiProperty({ description: "Gruñido del Pokémon" })
	grunido: string;
	@ApiProperty({ description: "Imagen del Pokémon" })
	imagen: string;
	@ApiProperty({ description: "Ataque del Pokémon" })
	ataque: number;
	@ApiProperty({ description: "Defensa del Pokémon" })
	defensa: number;
	@ApiProperty({ description: "Ataque especial del Pokémon" })
	ataque_especial: number;
	@ApiProperty({ description: "Defensa especial del Pokémon" })
	defensa_especial: number;
	@ApiProperty({ description: "Velocidad del Pokémon" })
	velocidad: number;
	@ApiProperty({ description: "Altura del Pokémon" })
	altura: number;
	@ApiProperty({ description: "Peso del Pokémon" })
	peso: number;
	@ApiProperty({ description: "Sprite del Pokémon" })
	sprite: string;
	orden: number;
	creadoEn: Date;
	actualizadoEn: Date;

    @Type(() => TipoPokemon)
	tipos?: TipoPokemon[];
}

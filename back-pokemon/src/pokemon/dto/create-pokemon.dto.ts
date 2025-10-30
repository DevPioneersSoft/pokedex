import { IsInt, IsString, IsOptional, IsArray, MaxLength } from 'class-validator';

export class CreatePokemonDto {
	@IsInt()
	numero: number;

	@IsString()
	@MaxLength(250)
	nombre: string;

	@IsString()
	@MaxLength(250)
	descripcion: string;

	@IsString()
	@MaxLength(250)
	grunido: string;

	@IsString()
	@MaxLength(350)
	imagen: string;

	@IsInt()
	ataque: number;

	@IsInt()
	defensa: number;

	@IsInt()
	ataque_especial: number;

	@IsInt()
	defensa_especial: number;

	@IsInt()
	velocidad: number;

	@IsInt()
	altura: number;

	@IsInt()
	peso: number;

	@IsString()
	@MaxLength(250)
	sprite: string;

	@IsInt()
	orden: number;

	@IsOptional()
	@IsArray()
	tipos?: any[];
}


import { IsInt, IsString, IsDate, IsOptional, IsArray, Min, MaxLength } from 'class-validator';
import { Pokemon as PrismaPokemon } from '../../../prisma/generated/prisma/client';

export class Pokemon implements PrismaPokemon {
	@IsInt()
	id: number;

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

	@IsDate()
	creadoEn: Date;

	@IsDate()
	actualizadoEn: Date;

	@IsOptional()
	@IsArray()
	tipos?: any[];
}

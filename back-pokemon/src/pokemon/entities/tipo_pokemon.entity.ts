import { tipoPokemon as PrismaTipoPokemon } from '../../../prisma/generated/prisma/client';

export class TipoPokemon implements PrismaTipoPokemon {
	id: number;
	nombre: string;
	pokemones?: any[];
}

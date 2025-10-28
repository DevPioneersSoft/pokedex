import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
export declare class PokemonService {
    create(createPokemonDto: CreatePokemonDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePokemonDto: UpdatePokemonDto): string;
    remove(id: number): string;
}

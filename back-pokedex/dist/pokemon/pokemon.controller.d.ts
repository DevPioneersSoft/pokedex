import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
export declare class PokemonController {
    private readonly pokemonService;
    constructor(pokemonService: PokemonService);
    create(createPokemonDto: CreatePokemonDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updatePokemonDto: UpdatePokemonDto): string;
    remove(id: string): string;
}

import { PartialType } from '@nestjs/swagger';
import { CreatePokemonDto } from './create-pokemon.dto';

export class UpdatePokemonDto extends PartialType(CreatePokemonDto) {}

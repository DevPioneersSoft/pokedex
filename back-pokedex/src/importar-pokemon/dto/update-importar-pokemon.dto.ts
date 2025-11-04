import { PartialType } from '@nestjs/swagger';
import { CreateImportarPokemonDto } from './create-importar-pokemon.dto';

export class UpdateImportarPokemonDto extends PartialType(CreateImportarPokemonDto) {}

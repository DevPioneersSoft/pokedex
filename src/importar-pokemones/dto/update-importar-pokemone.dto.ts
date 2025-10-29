import { PartialType } from '@nestjs/swagger';
import { CreateImportarPokemoneDto } from './create-importar-pokemone.dto';

export class UpdateImportarPokemoneDto extends PartialType(CreateImportarPokemoneDto) {}

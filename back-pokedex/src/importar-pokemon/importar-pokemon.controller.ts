import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ImportarPokemonService } from './importar-pokemon.service';
import { CreateImportarPokemonDto } from './dto/create-importar-pokemon.dto';
import { UpdateImportarPokemonDto } from './dto/update-importar-pokemon.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Importar Pokemon')
@Controller('importar-pokemon')
export class ImportarPokemonController {
  constructor(private readonly importarPokemonService: ImportarPokemonService) {}

  @Post()
  @ApiOperation({ summary: 'Import pokemon from external API (PokeAPI)' })
  @ApiResponse({ status: 201, description: 'Pokemon imported successfully from external API' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  importar() {
    return this.importarPokemonService.importPokemon();
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PaginacionResponseDto } from 'src/shared/dto/paginacion-response.dto';
import { PrismaQueryParamsDto } from 'src/shared/dto/prisma-query-params.dto';
import { ApiPrismaQuery } from 'src/shared/decorators/api-prisma-query.decorators';
import { ApiPaginatedResponse } from 'src/shared/decorators/paginated-response.decorators';
import { Pokemon } from './entities/pokemon.entity';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  @ApiPrismaQuery()
  @ApiPaginatedResponse(Pokemon)
  findAll(@Query() query: PrismaQueryParamsDto) {
    return this.pokemonService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pokemonService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePokemonDto: UpdatePokemonDto) {
    return this.pokemonService.update(+id, updatePokemonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pokemonService.remove(+id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { PrismaQueryParamsDto } from '../shared/dto/prisma-query-params-dto';
import { ApiPrismaQuery } from 'src/shared/decorators/api-prisma-query-decorator';
import { ApiPaginatedResponse } from 'src/shared/decorators/paginated-response-decorator';
import { PokemonEntity } from './entities/pokemon.entity';
import { Public } from 'src/autenticacion/decorators/public.decorator';

@ApiTags('Pokemon')
@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new pokemon' })
  @ApiResponse({ status: 201, description: 'Pokemon created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get all pokemons' })
  @ApiPrismaQuery()
  @ApiPaginatedResponse(PokemonEntity)
  findAll(@Query() query: PrismaQueryParamsDto) {
    return this.pokemonService.findAll(query);
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Get a pokemon by ID' })
  @ApiParam({ name: 'id', description: 'Pokemon ID' })
  @ApiResponse({ status: 200, description: 'Pokemon found' })
  @ApiResponse({ status: 404, description: 'Pokemon not found' })
  findOne(@Param('id') id: string) {
    return this.pokemonService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a pokemon' })
  @ApiParam({ name: 'id', description: 'Pokemon ID' })
  @ApiResponse({ status: 200, description: 'Pokemon updated successfully' })
  @ApiResponse({ status: 404, description: 'Pokemon not found' })
  update(@Param('id') id: string, @Body() updatePokemonDto: UpdatePokemonDto) {
    return this.pokemonService.update(+id, updatePokemonDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a pokemon' })
  @ApiParam({ name: 'id', description: 'Pokemon ID' })
  @ApiResponse({ status: 200, description: 'Pokemon deleted successfully' })
  @ApiResponse({ status: 404, description: 'Pokemon not found' })
  remove(@Param('id') id: string) {
    return this.pokemonService.remove(+id);
  }
}

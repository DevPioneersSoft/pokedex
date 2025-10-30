import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PrismaQueryParamsDto } from 'src/shared/dto/prisma-query-params.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página (opcional)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Cantidad por página (opcional)' })
  @ApiQuery({ name: 'skip', required: false, type: Number, description: 'Índice de inicio (opcional, alternativo a page)' })
  @ApiQuery({ name: 'take', required: false, type: Number, description: 'Cantidad por página (opcional, alternativo a limit)' })
  findAll(@Query() query: any) {
    let { page, limit, ...rest } = query;
    let skip, take;
    if (page !== undefined && limit !== undefined) {
      const pageNum = parseInt(page, 10);
      const limitNum = parseInt(limit, 10);
      skip = (pageNum - 1) * limitNum;
      take = limitNum;
    }
    
    if (query.skip !== undefined) skip = parseInt(query.skip, 10);
    if (query.take !== undefined) take = parseInt(query.take, 10);
    const dto: PrismaQueryParamsDto = {
      ...rest,
      skip,
      take,
    };
    return this.pokemonService.findAll(dto);
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

  @Post('importar')
  async importarPokemones() {
    return this.pokemonService.importarYGuardarPokemones();
  }
}

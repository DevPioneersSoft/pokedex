import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { EquipoService } from './equipo.service';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';
import { ApiTags } from '@nestjs/swagger';
import { 
  ApiCrearEquipo, 
  ApiObtenerEquipo, 
  ApiEliminarEquipo,
  ApiAgregarPokemon,
  ApiEliminarPokemon
} from './decorators/api-equipo-decorator';

@ApiTags('Equipo')
@Controller('equipo')
export class EquipoController {
  constructor(private readonly equipoService: EquipoService) {}

  @Post('usuario/:usuarioId')
  @ApiCrearEquipo()
  create(
    @Param('usuarioId', ParseIntPipe) usuarioId: number,
    @Body() createEquipoDto: CreateEquipoDto
  ) {
    return this.equipoService.create(usuarioId, createEquipoDto);
  }

  @Get('usuario/:usuarioId')
  @ApiObtenerEquipo()
  findByUsuario(@Param('usuarioId', ParseIntPipe) usuarioId: number) {
    return this.equipoService.findByUsuario(usuarioId);
  }

  @Delete('usuario/:usuarioId')
  @ApiEliminarEquipo()
  removeByUsuario(@Param('usuarioId', ParseIntPipe) usuarioId: number) {
    return this.equipoService.removeByUsuario(usuarioId);
  }

  @Post('usuario/:usuarioId/pokemon')
  @ApiAgregarPokemon()
  addPokemonToEquipo(
    @Param('usuarioId', ParseIntPipe) usuarioId: number,
    @Body('pokemonId', ParseIntPipe) pokemonId: number
  ) {
    return this.equipoService.addPokemonToEquipo(usuarioId, pokemonId);
  }

  @Delete('usuario/:usuarioId/pokemon/:pokemonId')
  @ApiEliminarPokemon()
  removePokemonFromEquipo(
    @Param('usuarioId', ParseIntPipe) usuarioId: number,
    @Param('pokemonId', ParseIntPipe) pokemonId: number
  ) {
    return this.equipoService.removePokemonFromEquipo(usuarioId, pokemonId);
  }
}

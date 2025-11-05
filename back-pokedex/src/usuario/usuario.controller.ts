import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { FavoritosService } from 'src/favoritos/favoritos.service';
import { LoggingInterceptor } from 'src/shared/interceptors/logging.interceptor';
import { EquipoService } from 'src/equipo/equipo.service';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService,
    private readonly favoritosService: FavoritosService,
    private readonly equipoService: EquipoService) {}

  @Patch('/favoritos/:id')
  actualizarFavoritos(@Param('id') id: string, @Body() pokemonesId: number[]) {
    if(!pokemonesId) pokemonesId = []
    let result = pokemonesId.filter(v => Number.isInteger(v as number));
    return this.favoritosService.actualizarFavoritos(result, +id);
  }

  @Patch('/equipo/:id')
  actualizarEquipo(@Param('id') id: string, @Body() pokemonesId: number[]) {
    if(!pokemonesId) pokemonesId = []
    let result = pokemonesId.filter(v => Number.isInteger(v as number));
    return this.equipoService.actualizarEquipo(result, +id);
  }

  @Get('/favoritos/:id/:returnIdArray')
  obtenerFavoritosUsuario(@Param('id') id: string, @Param('returnIdArray') returnIdArray: string) {
    return this.favoritosService.findTeamById(+id, +returnIdArray);
  }

  @Get('/equipo/:id/:returnIdArray')
  obtenerEquipoUsuario(@Param('id') id: string, @Param('returnIdArray') returnIdArray: string) {
    return this.equipoService.findTeamById(+id, +returnIdArray);
  }

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(+id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { FavoritosService } from '../favoritos/favoritos.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly favoritosService: FavoritosService,
  ) {}

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

  @Patch(':id/favoritos')
  async actualizarFavoritos(
    @Param('id') id: string,
    @Body('favoritos') favoritos: number[],
  ) {
    await this.favoritosService.actualizarFavoritos(+id, favoritos);
    return { message: 'Favoritos actualizados correctamente' };
  }

  @Get(':id/favoritos')
  async getFavoritos(@Param('id') id: string) {
    const usuario = await this.usuarioService.findOne(+id);
    return usuario?.favoritos || [];
  }
}

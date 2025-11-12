import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { FavoritosService } from 'src/favoritos/favoritos.service';
import { ApiOperation } from '@nestjs/swagger';
import { FavoritosDto } from 'src/favoritos/dto/favoritos.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService,
    private readonly favoritosService: FavoritosService
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

  @Post('/favoritos')
  @ApiOperation({
    summary : 'Actualiza la lista de pokemon favoritos del usuario',
    description : 'Recibe una lista de ids de pokemon y actualiza la lista de favoritos del usuario'
  })
  updateFavoritos(@Body() body: FavoritosDto) {
    return this.favoritosService.actualizarFavoritos(body);
  }

}

import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ApiOperation } from '@nestjs/swagger';
import { FavoritosDto } from './dto/favoritos.dto';
import { FavoritosService } from 'src/favoritos/favoritos.service';
import { LoggingInterceptor } from 'src/shared/interceptor/logging.interceptor';

@Controller('usuario')
export class UsuarioController {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly favoritoService: FavoritosService,
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

  @Post("/favoritos")
  @UseInterceptors(LoggingInterceptor)
  @ApiOperation({
    summary:"Actualiza la lista de pokémon favoritos del usuario",
    description:"Recibe una lista de IDs de pokemon y actualiza la lista de favoritos del usuario",
  })
  updateFavoritos(@Body() body : FavoritosDto){
    return  this.favoritoService.actualizarFavoritos(body);
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

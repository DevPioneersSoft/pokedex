import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { AutenticarUsuarioDto } from './dto/autenticar-usuario.dto';
import { PrismaQueryParamsDto } from '../shared/dto/prisma-query-params-dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard } from '../autenticacion/guard/jwt.guard';
import { 
  ApiCrearUsuario,
  ApiObtenerUsuarios,
  ApiObtenerUsuario,
  ApiActualizarUsuario,
  ApiEliminarUsuario,
  ApiAutenticarUsuario
} from './decorators/api-usuarios-decorator';
import { Public } from 'src/autenticacion/decorators/public.decorator';

@ApiTags('Usuarios')
@Controller('usuario')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  @Public()
  @ApiCrearUsuario()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Post('autenticacion')
  @ApiAutenticarUsuario()
  autenticar(@Body() autenticarUsuarioDto: AutenticarUsuarioDto) {
    return this.usuariosService.autenticar(
      autenticarUsuarioDto.username,
      autenticarUsuarioDto.contrasena
    );
  }

  @Get()
  @ApiObtenerUsuarios()
  findAll(@Query() query: PrismaQueryParamsDto) {
    return this.usuariosService.findAll(query);
  }

  @Get(':id')
  @ApiObtenerUsuario()
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(+id);
  }

  @Patch(':id')
  @ApiActualizarUsuario()
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  @ApiEliminarUsuario()
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(+id);
  }
}

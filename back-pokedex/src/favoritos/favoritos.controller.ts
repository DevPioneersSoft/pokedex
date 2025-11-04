import { Controller, Get, Post, Body, Param, Delete, Put, UseInterceptors } from '@nestjs/common';
import { FavoritosService } from './favoritos.service';
import { ApiTags } from '@nestjs/swagger';
import { 
  ApiActualizarFavoritos, 
  ApiObtenerFavoritos, 
  ApiAgregarFavorito, 
  ApiRemoverFavorito 
} from './decorators/api-favoritos-decorator';
import { LoggingInterceptor } from 'src/shared/interceptores/logging.interceptor';

@ApiTags('Favoritos')
@Controller('favoritos')
export class FavoritosController {
  constructor(private readonly favoritosService: FavoritosService) {}

  @Put('usuario/:usuarioId')
  @ApiActualizarFavoritos()
  // @UseInterceptors(LoggingInterceptor) // Si se quisiera usar solo en este endpoint
  async actualizarFavoritos(
    @Param('usuarioId') usuarioId: number, 
    @Body() body: { pokemonIds: number[] }
  ) {
    return this.favoritosService.actualizarFavoritos(usuarioId, body.pokemonIds);
  }

  @Get('usuario/:usuarioId')
  @ApiObtenerFavoritos()
  async obtenerFavoritos(@Param('usuarioId') usuarioId: number) {
    return this.favoritosService.obtenerFavoritos(+usuarioId);
  }

  @Post('usuario/:usuarioId/pokemon/:pokemonId')
  @ApiAgregarFavorito()
  async agregarFavorito(
    @Param('usuarioId') usuarioId: number,
    @Param('pokemonId') pokemonId: number
  ) {
    return this.favoritosService.agregarFavorito(usuarioId, pokemonId);
  }

  @Delete('usuario/:usuarioId/pokemon/:pokemonId')
  @ApiRemoverFavorito()
  async removerFavorito(
    @Param('usuarioId') usuarioId: number,
    @Param('pokemonId') pokemonId: number
  ) {
    return this.favoritosService.removerFavorito(usuarioId, pokemonId);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { FavoritosService } from './favoritos.service';
import { FavoritoDto } from './dto/favorito.dto';
import { LoggingInterceptor } from 'src/shared/interceptores/logging.interceptor';

@Controller('favoritos')
export class FavoritosController {
  constructor(private readonly favoritosService: FavoritosService) {}

  @Post()
  @UseInterceptors(LoggingInterceptor)
  actualizar(@Body() data: FavoritoDto) {        
    return this.favoritosService.actualizarFavoritos(data);
  }

}

/*import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FavoritosService } from './favoritos.service';

@Controller('favoritos')
export class FavoritosController {
  constructor(private readonly favoritosService: FavoritosService) {}

  @Patch(':id')
  actualizarFavoritos(@Param('id') id: string, @Body() pokemonesId: number[]) {
    if(!pokemonesId) pokemonesId = []
    return this.favoritosService.actualizarFavoritos(pokemonesId, +id);
  }
}*/

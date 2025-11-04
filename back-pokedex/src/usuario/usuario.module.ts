import { Module } from '@nestjs/common';
import { FavoritosService } from 'src/favoritos/favoritos.service';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService, FavoritosService],
  exports: [UsuarioService]
})
export class UsuarioModule { }

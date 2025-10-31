import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { FavoritosService } from 'src/favoritos/favoritos.service';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService, PrismaService, FavoritosService],
})
export class UsuarioModule {}

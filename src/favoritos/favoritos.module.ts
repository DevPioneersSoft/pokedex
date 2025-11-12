import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FavoritosService } from './favoritos.service';
import { FavoritosController } from './favoritos.controller';

@Module({
  controllers: [FavoritosController],
  providers: [FavoritosService, PrismaService],
})
export class FavoritosModule {}

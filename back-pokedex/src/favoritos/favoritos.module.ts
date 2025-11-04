import { Module } from '@nestjs/common';
import { FavoritosService } from './favoritos.service';
import { FavoritosController } from './favoritos.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaErrorHandlerService } from 'src/utils/prisma-error-handler.service';

@Module({
  controllers: [FavoritosController],
  providers: [FavoritosService, PrismaService, PrismaErrorHandlerService],
})
export class FavoritosModule {}

import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaErrorHandlerService } from 'src/utils/prisma-error-handler.service';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService, PrismaService, PrismaErrorHandlerService],
})
export class UsuariosModule {}

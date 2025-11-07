import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService, PrismaService],
})
export class UsuarioModule {}

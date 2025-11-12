import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FavoritosDto } from './dto/favoritos.dto';

@Injectable()
export class FavoritosService {

  constructor(private prisma: PrismaService) {}

  async actualizarFavoritos(
    dto : FavoritosDto
  ): Promise<void> {
    const {pokemonesIds, usuarioId} = dto;
    await this.prisma.usuario.update({
      where: { id: usuarioId },
      data: {
        favoritos: {
          set: pokemonesIds.map((id) => ({ id })),
        },
      },
    });
  }
  
}
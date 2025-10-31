import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FavoritosDto } from 'src/usuario/dto/favoritos.dto';

@Injectable()
export class FavoritosService {
  private logger = new Logger(FavoritosService.name);
  constructor(private prisma: PrismaService) {}
  async actualizarFavoritos(dto: FavoritosDto): Promise<void> {
    const { pokemones, userId } = dto;
    await this.prisma.usuario.update({
      where: { id: userId },
      data: {
        favoritos: {
          set: pokemones.map((id) => ({ id })),
        },
      },
    });
  }
}

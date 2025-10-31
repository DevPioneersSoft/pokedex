import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FavoritosService {
    constructor(private readonly prisma: PrismaService) {}
    async actualizarFavoritos(usuarioId: number, favoritos: number[]): Promise<void> {
        await this.prisma.usuario.update({
            where: { id: usuarioId },
            data: {
                favoritos: {
                    set: favoritos.map((id) => ({ id })),
                },
            },
        });
    }
}

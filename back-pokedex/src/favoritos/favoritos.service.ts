import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateFavoritoDto } from './dto/create-favorito.dto';
import { UpdateFavoritoDto } from './dto/update-favorito.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaErrorHandlerService } from 'src/utils/prisma-error-handler.service';

@Injectable()
export class FavoritosService {
  private readonly logger = new Logger(FavoritosService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly prismaErrorHandler: PrismaErrorHandlerService
  ) {}
  
  async actualizarFavoritos(usuarioId: number, pokemonIds: number[]): Promise<void> {
    try {
      this.logger.log(`Actualizando favoritos para usuario ${usuarioId}`);
      
      const usuario = await this.prisma.usuario.findUnique({
        where: { id: usuarioId }
      });

      if (!usuario) {
        throw new NotFoundException(`Usuario con ID ${usuarioId} no encontrado`);
      }

      if (pokemonIds.length > 0) {
        const pokemonCount = await this.prisma.pokemon.count({
          where: { id: { in: pokemonIds } }
        });

        if (pokemonCount !== pokemonIds.length) {
          throw new NotFoundException('Uno o más Pokemon no fueron encontrados');
        }
      }

      await this.prisma.usuario.update({
        where: { id: usuarioId },
        data: {
          favoritos: {
            set: pokemonIds.map((id) => ({ id })),
          },
        },
      });

      this.logger.log(`Favoritos actualizados exitosamente para usuario ${usuarioId}`);
    } catch (error) {
      this.prismaErrorHandler.handleError(error, `Error al actualizar favoritos del usuario ${usuarioId}`);
    }
  }

  async obtenerFavoritos(usuarioId: number) {
    try {
      this.logger.log(`Obteniendo favoritos del usuario ${usuarioId}`);
      
      const usuario = await this.prisma.usuario.findUnique({
        where: { id: usuarioId },
        include: {
          favoritos: {
            include: {
              tipoPokemon: true
            }
          }
        }
      });

      if (!usuario) {
        throw new NotFoundException(`Usuario con ID ${usuarioId} no encontrado`);
      }

      return usuario.favoritos;
    } catch (error) {
      this.prismaErrorHandler.handleError(error, `Error al obtener favoritos del usuario ${usuarioId}`);
    }
  }

  async agregarFavorito(usuarioId: number, pokemonId: number): Promise<void> {
    try {
      this.logger.log(`Agregando Pokemon ${pokemonId} a favoritos del usuario ${usuarioId}`);
      
      const usuario = await this.prisma.usuario.findUnique({
        where: { id: usuarioId }
      });

      if (!usuario) {
        throw new NotFoundException(`Usuario con ID ${usuarioId} no encontrado`);
      }

      const pokemon = await this.prisma.pokemon.findUnique({
        where: { id: pokemonId }
      });

      if (!pokemon) {
        throw new NotFoundException(`Pokemon con ID ${pokemonId} no encontrado`);
      }

      await this.prisma.usuario.update({
        where: { id: usuarioId },
        data: {
          favoritos: {
            connect: { id: pokemonId }
          }
        }
      });

      this.logger.log(`Pokemon ${pokemonId} agregado a favoritos del usuario ${usuarioId}`);
    } catch (error) {
      this.prismaErrorHandler.handleError(error, `Error al agregar favorito del usuario ${usuarioId}`);
    }
  }

  async removerFavorito(usuarioId: number, pokemonId: number): Promise<void> {
    try {
      this.logger.log(`Removiendo Pokemon ${pokemonId} de favoritos del usuario ${usuarioId}`);
      
      const usuario = await this.prisma.usuario.findUnique({
        where: { id: usuarioId }
      });

      if (!usuario) {
        throw new NotFoundException(`Usuario con ID ${usuarioId} no encontrado`);
      }

      await this.prisma.usuario.update({
        where: { id: usuarioId },
        data: {
          favoritos: {
            disconnect: { id: pokemonId }
          }
        }
      });

      this.logger.log(`Pokemon ${pokemonId} removido de favoritos del usuario ${usuarioId}`);
    } catch (error) {
      this.prismaErrorHandler.handleError(error, `Error al remover favorito del usuario ${usuarioId}`);
    }
  }


}

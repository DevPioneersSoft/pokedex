import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EquipoService {
  private readonly logger = new Logger(EquipoService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(idUsuario: number, createEquipoDto: CreateEquipoDto) {
    const { pokemonIds } = createEquipoDto;

    try {
      // Verificar que el usuario existe
      const usuario = await this.prisma.usuario.findUnique({
        where: { id: idUsuario }
      });

      if (!usuario) {
        throw new NotFoundException(`Usuario con ID ${idUsuario} no encontrado`);
      }

      // Verificar que todos los Pokémon existen
      const pokemonsExistentes = await this.prisma.pokemon.findMany({
        where: { id: { in: pokemonIds } },
        select: { id: true }
      });

      const idsExistentes = pokemonsExistentes.map(p => p.id);
      const idsNoEncontrados = pokemonIds.filter(id => !idsExistentes.includes(id));

      if (idsNoEncontrados.length > 0) {
        throw new NotFoundException(
          `Pokémon con IDs [${idsNoEncontrados.join(', ')}] no encontrados`
        );
      }

      // Verificar que no hay IDs duplicados
      const idsUnicos = [...new Set(pokemonIds)];
      if (idsUnicos.length !== pokemonIds.length) {
        throw new BadRequestException('No se pueden incluir Pokémon duplicados en el equipo');
      }

      // Eliminar equipo anterior del usuario
      await this.prisma.equipoPokemon.deleteMany({
        where: { usuarioId: idUsuario }
      });

      // Crear nuevo equipo
      const equipoData = pokemonIds.map((pokemonId, index) => ({
        usuarioId: idUsuario,
        pokemonId,
        posicion: index + 1,
        esLider: index === 0 // El primer Pokémon es el líder
      }));

      const nuevoEquipo = await this.prisma.equipoPokemon.createMany({
        data: equipoData
      });

      this.logger.log(`Equipo creado/actualizado para usuario ${idUsuario} con ${pokemonIds.length} Pokémon`);

      // Retornar el equipo completo
      return this.findByUsuario(idUsuario);

    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      this.logger.error('Error al crear equipo', error);
      throw new Error('Error interno del servidor');
    }
  }

  async findByUsuario(idUsuario: number) {
    try {
      // Verificar que el usuario existe
      const usuario = await this.prisma.usuario.findUnique({
        where: { id: idUsuario }
      });

      if (!usuario) {
        throw new NotFoundException(`Usuario con ID ${idUsuario} no encontrado`);
      }

      // Obtener el equipo del usuario
      const equipo = await this.prisma.equipoPokemon.findMany({
        where: { usuarioId: idUsuario },
        include: {
          pokemon: {
            select: {
              id: true,
              nombre: true,
              imagen: true,
              types: true,
              vida: true,
              ataque: true,
              defensa: true,
              ataqueEspecial: true,
              defensaEspecial: true,
              velocidad: true
            }
          }
        },
        orderBy: { posicion: 'asc' }
      });

      return equipo.map(item => ({
        ...item.pokemon,
        posicion: item.posicion,
        esLider: item.esLider,
        fechaAgregado: item.createdAt
      }));

    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error('Error al obtener equipo', error);
      throw new Error('Error interno del servidor');
    }
  }

  async removeByUsuario(idUsuario: number) {
    try {
      // Verificar que el usuario existe
      const usuario = await this.prisma.usuario.findUnique({
        where: { id: idUsuario }
      });

      if (!usuario) {
        throw new NotFoundException(`Usuario con ID ${idUsuario} no encontrado`);
      }

      // Eliminar todo el equipo del usuario
      const equipoEliminado = await this.prisma.equipoPokemon.deleteMany({
        where: { usuarioId: idUsuario }
      });

      this.logger.log(`Equipo eliminado para usuario ${idUsuario}. ${equipoEliminado.count} Pokémon removidos`);

      return {
        message: `Equipo del usuario ${usuario.username} eliminado exitosamente`,
        pokemonRemovidos: equipoEliminado.count
      };

    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error('Error al eliminar equipo', error);
      throw new Error('Error interno del servidor');
    }
  }

  async addPokemonToEquipo(idUsuario: number, pokemonId: number) {
    try {
      // Verificar que el usuario existe
      const usuario = await this.prisma.usuario.findUnique({
        where: { id: idUsuario }
      });

      if (!usuario) {
        throw new NotFoundException(`Usuario con ID ${idUsuario} no encontrado`);
      }

      // Verificar que el Pokémon existe
      const pokemon = await this.prisma.pokemon.findUnique({
        where: { id: pokemonId }
      });

      if (!pokemon) {
        throw new NotFoundException(`Pokémon con ID ${pokemonId} no encontrado`);
      }

      // Verificar que el equipo no esté completo (máximo 6 Pokémon)
      const equipoActual = await this.prisma.equipoPokemon.count({
        where: { usuarioId: idUsuario }
      });

      if (equipoActual >= 6) {
        throw new BadRequestException('El equipo ya tiene el máximo de 6 Pokémon');
      }

      // Verificar que el Pokémon no esté ya en el equipo
      const pokemonExisteEnEquipo = await this.prisma.equipoPokemon.findFirst({
        where: { 
          usuarioId: idUsuario,
          pokemonId: pokemonId 
        }
      });

      if (pokemonExisteEnEquipo) {
        throw new BadRequestException('Este Pokémon ya está en el equipo');
      }

      // Agregar el Pokémon al equipo
      const nuevaPosicion = equipoActual + 1;
      const esLider = equipoActual === 0; // Solo es líder si es el primer Pokémon

      const nuevoPokemonEquipo = await this.prisma.equipoPokemon.create({
        data: {
          usuarioId: idUsuario,
          pokemonId: pokemonId,
          posicion: nuevaPosicion,
          esLider: esLider
        },
        include: {
          pokemon: {
            select: {
              id: true,
              nombre: true,
              imagen: true,
              types: true,
              vida: true,
              ataque: true,
              defensa: true,
              ataqueEspecial: true,
              defensaEspecial: true,
              velocidad: true
            }
          }
        }
      });

      this.logger.log(`Pokémon ${pokemon.nombre} agregado al equipo del usuario ${idUsuario}`);

      // Retornar toda la lista del equipo actualizada
      return this.findByUsuario(idUsuario);

    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      this.logger.error('Error al agregar Pokémon al equipo', error);
      throw new Error('Error interno del servidor');
    }
  }

  async removePokemonFromEquipo(idUsuario: number, pokemonId: number) {
    try {
      // Verificar que el usuario existe
      const usuario = await this.prisma.usuario.findUnique({
        where: { id: idUsuario }
      });

      if (!usuario) {
        throw new NotFoundException(`Usuario con ID ${idUsuario} no encontrado`);
      }

      // Verificar que el Pokémon está en el equipo
      const pokemonEnEquipo = await this.prisma.equipoPokemon.findFirst({
        where: { 
          usuarioId: idUsuario,
          pokemonId: pokemonId 
        },
        include: {
          pokemon: { select: { nombre: true } }
        }
      });

      if (!pokemonEnEquipo) {
        throw new NotFoundException('Este Pokémon no está en el equipo del usuario');
      }

      // Eliminar el Pokémon del equipo
      await this.prisma.equipoPokemon.delete({
        where: { id: pokemonEnEquipo.id }
      });

      // Reorganizar posiciones del equipo restante
      await this.prisma.equipoPokemon.updateMany({
        where: { 
          usuarioId: idUsuario,
          posicion: { gt: pokemonEnEquipo.posicion }
        },
        data: {
          posicion: { decrement: 1 }
        }
      });

      // Si el Pokémon eliminado era el líder, hacer líder al nuevo primer Pokémon
      if (pokemonEnEquipo.esLider) {
        const nuevoPrimerPokemon = await this.prisma.equipoPokemon.findFirst({
          where: { usuarioId: idUsuario },
          orderBy: { posicion: 'asc' }
        });

        if (nuevoPrimerPokemon) {
          await this.prisma.equipoPokemon.update({
            where: { id: nuevoPrimerPokemon.id },
            data: { esLider: true }
          });
        }
      }

      this.logger.log(`Pokémon ${pokemonEnEquipo.pokemon.nombre} eliminado del equipo del usuario ${idUsuario}`);

      // Retornar toda la lista del equipo actualizada
      return this.findByUsuario(idUsuario);

    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      this.logger.error('Error al eliminar Pokémon del equipo', error);
      throw new Error('Error interno del servidor');
    }
  }
}

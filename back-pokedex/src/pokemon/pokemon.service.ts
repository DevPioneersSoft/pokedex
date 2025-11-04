import { Injectable, Logger, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PokemonEntity } from './entities/pokemon.entity';
import { PrismaErrorHandlerService } from 'src/utils/prisma-error-handler.service';
import { PrismaQueryParamsDto } from 'src/shared/dto/prisma-query-params-dto';
import { PaginatedResponseDto } from 'src/shared/dto/paginated-response-dto';
import { buildPaginatedResponse } from 'src/shared/helpers/build-paginated-response';

@Injectable()
export class PokemonService {
  private readonly logger = new Logger(PokemonService.name);
  
  constructor(
    private readonly prisma: PrismaService,
    private readonly prismaErrorHandler: PrismaErrorHandlerService
  ) {}
  
  async create(createPokemonDto: CreatePokemonDto): Promise<PokemonEntity> {
    try {
      this.logger.log('Creating a new pokemon');
      
      // Verificar si el pokemon ya existe
      const existingPokemon = await this.prisma.pokemon.findUnique({
        where: { id: createPokemonDto.id }
      });

      if (existingPokemon) {
        throw new ConflictException(`El Pokémon con ID ${createPokemonDto.id} ya existe`);
      }

      // Extraer los tipos del string separado por comas
      const tiposArray = createPokemonDto.types.split(',').map(tipo => tipo.trim());

      // Crear los tipos si no existen
      await this.prisma.tipoPokemon.createMany({
        data: tiposArray.map(tipo => ({ nombre: tipo })),
        skipDuplicates: true,
      });

      // Crear el pokemon con la relación a los tipos
      const pokemon = await this.prisma.pokemon.create({
        data: {
          ...createPokemonDto,
          tipoPokemon: {
            connect: tiposArray.map(tipo => ({ nombre: tipo }))
          }
        },
        include: {
          tipoPokemon: true
        }
      });

      this.logger.log(`Pokémon ${pokemon.nombre} creado exitosamente`);
      return pokemon;
    } catch (error) {
      this.prismaErrorHandler.handleError(error, 'Error al crear Pokémon');
    }
  }

  async findAll(params: PrismaQueryParamsDto): Promise<PaginatedResponseDto<PokemonEntity>> {
    const { skip = 0, take = 10, where = {}, orderBy = {} } = params;
    try {
      this.logger.log('Fetching all pokemon');
      const [data, total] = await Promise.all([
        this.prisma.pokemon.findMany({
          skip, take, where, orderBy,
          include: {
            tipoPokemon: true 
          }
        }),
        this.prisma.pokemon.count({ where })
      ]);
      
      return buildPaginatedResponse<PokemonEntity>({ data, total, skip, take });
    } catch (error) {
      this.prismaErrorHandler.handleError(error, 'Error al obtener pokémon');
    }
  }

  async findOne(id: number): Promise<PokemonEntity | null> {
    try {
      this.logger.log(`Fetching pokemon with id: ${id}`);
      const pokemon = await this.prisma.pokemon.findUnique({
        where: { id },
        include: {
          tipoPokemon: true
        }
      });

      if (!pokemon) {
        this.logger.warn(`Pokémon con ID ${id} no encontrado`);
        throw new NotFoundException(`Pokémon con ID ${id} no encontrado`);
      }

      return pokemon;
    } catch (error) {
      this.prismaErrorHandler.handleError(error, `Error al obtener pokémon ${id}`);
    }
  }

  async update(id: number, updatePokemonDto: UpdatePokemonDto): Promise<PokemonEntity> {
    try {
      this.logger.log(`Updating pokemon with id: ${id}`);

      // Verificar si el pokemon existe
      const existingPokemon = await this.prisma.pokemon.findUnique({
        where: { id }
      });

      if (!existingPokemon) {
        throw new NotFoundException(`El Pokémon con ID ${id} no existe`);
      }

      // Si se actualizan los tipos, manejar la relación
      let updateData: any = { ...updatePokemonDto };
      
      if (updatePokemonDto.types) {
        const tiposArray = updatePokemonDto.types.split(',').map(tipo => tipo.trim());
        
        // Crear los tipos si no existen
        await this.prisma.tipoPokemon.createMany({
          data: tiposArray.map(tipo => ({ nombre: tipo })),
          skipDuplicates: true,
        });

        updateData = {
          ...updatePokemonDto,
          tipoPokemon: {
            set: [], // Desconectar todos los tipos actuales
            connect: tiposArray.map(tipo => ({ nombre: tipo }))
          }
        };
      }

      const pokemon = await this.prisma.pokemon.update({
        where: { id },
        data: updateData,
        include: {
          tipoPokemon: true
        }
      });

      this.logger.log(`Pokémon ${pokemon.nombre} actualizado exitosamente`);
      return pokemon;
    } catch (error) {
      this.prismaErrorHandler.handleError(error, `Error al actualizar pokémon ${id}`);
    }
  }

  async remove(id: number): Promise<PokemonEntity> {
    try {
      this.logger.log(`Deleting pokemon with id: ${id}`);

      // Verificar si el pokemon existe
      const existingPokemon = await this.prisma.pokemon.findUnique({
        where: { id },
        include: {
          tipoPokemon: true
        }
      });

      if (!existingPokemon) {
        throw new NotFoundException(`El Pokémon con ID ${id} no existe`);
      }

      // Primero desconectar las relaciones
      await this.prisma.pokemon.update({
        where: { id },
        data: {
          tipoPokemon: {
            set: []
          }
        }
      });

      // Luego eliminar el pokemon
      await this.prisma.pokemon.delete({
        where: { id },
      });

      this.logger.log(`Pokémon ${existingPokemon.nombre} eliminado exitosamente`);
      return existingPokemon;
    } catch (error) {
      this.prismaErrorHandler.handleError(error, `Error al eliminar pokémon ${id}`);
    }
  }
}

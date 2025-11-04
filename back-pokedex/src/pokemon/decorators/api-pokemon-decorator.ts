import { ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { ApiPrismaQuery } from '../../shared/decorators/api-prisma-query-decorator';
import { 
  ApiOkResponse, 
  ApiCreatedResponse, 
  ApiPaginatedResponse, 
  ApiNotFoundResponse, 
  ApiConflictResponse,
  ApiCommonErrorResponses 
} from '../../shared/decorators/api-entity-response-decorator';
import { PokemonEntity } from '../entities/pokemon.entity';

export const ApiCrearPokemon = () =>
  applyDecorators(
    ApiOperation({ 
      summary: 'Crear un nuevo Pokemon',
      description: 'Crea un nuevo Pokemon en el sistema con sus tipos asociados.'
    }),
    ApiBody({
      description: 'Datos del nuevo Pokemon',
      schema: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          nombre: { type: 'string', example: 'bulbasaur' },
          descripcion: { type: 'string', example: 'A strange seed was planted on its back at birth.' },
          imagen: { type: 'string', example: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' },
          grunido: { type: 'string', example: 'bulba-bulba' },
          types: { type: 'string', example: 'grass,poison' }
        },
        required: ['id', 'nombre', 'descripcion', 'imagen', 'grunido', 'types']
      }
    }),
    ApiCreatedResponse(PokemonEntity, 'Pokemon creado exitosamente'),
    ApiConflictResponse('El Pokemon con este ID ya existe'),
    ApiCommonErrorResponses()
  );

export const ApiObtenerPokemon = () =>
  applyDecorators(
    ApiOperation({ 
      summary: 'Obtener todos los Pokemon con paginación',
      description: 'Recupera una lista paginada de Pokemon con sus tipos asociados'
    }),
    ApiPrismaQuery(),
    ApiPaginatedResponse(PokemonEntity, 'Lista paginada de Pokemon'),
    ApiCommonErrorResponses()
  );

export const ApiObtenerPokemonPorId = () =>
  applyDecorators(
    ApiOperation({ 
      summary: 'Obtener un Pokemon por ID',
      description: 'Recupera un Pokemon específico con todos sus tipos asociados'
    }),
    ApiParam({ 
      name: 'id', 
      description: 'ID único del Pokemon', 
      type: 'number',
      example: 1 
    }),
    ApiOkResponse(PokemonEntity, 'Pokemon encontrado'),
    ApiNotFoundResponse('Pokemon'),
    ApiCommonErrorResponses()
  );

export const ApiActualizarPokemon = () =>
  applyDecorators(
    ApiOperation({ 
      summary: 'Actualizar un Pokemon',
      description: 'Actualiza los datos de un Pokemon existente incluyendo sus tipos'
    }),
    ApiParam({ 
      name: 'id', 
      description: 'ID único del Pokemon a actualizar', 
      type: 'number',
      example: 1 
    }),
    ApiBody({
      description: 'Datos a actualizar del Pokemon (todos los campos son opcionales)',
      schema: {
        type: 'object',
        properties: {
          nombre: { type: 'string', example: 'ivysaur' },
          descripcion: { type: 'string', example: 'When the bulb on its back grows large...' },
          imagen: { type: 'string', example: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png' },
          grunido: { type: 'string', example: 'ivy-ivy' },
          types: { type: 'string', example: 'grass,poison' }
        }
      }
    }),
    ApiOkResponse(PokemonEntity, 'Pokemon actualizado exitosamente'),
    ApiNotFoundResponse('Pokemon'),
    ApiCommonErrorResponses()
  );

export const ApiEliminarPokemon = () =>
  applyDecorators(
    ApiOperation({ 
      summary: 'Eliminar un Pokemon',
      description: 'Elimina un Pokemon del sistema y desconecta sus relaciones. Esta acción no se puede deshacer.'
    }),
    ApiParam({ 
      name: 'id', 
      description: 'ID único del Pokemon a eliminar', 
      type: 'number',
      example: 1 
    }),
    ApiOkResponse(PokemonEntity, 'Pokemon eliminado exitosamente'),
    ApiNotFoundResponse('Pokemon'),
    ApiCommonErrorResponses()
  );
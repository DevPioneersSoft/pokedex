import { ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { 
  ApiOkResponse, 
  ApiCreatedResponse, 
  ApiPaginatedResponse, 
  ApiNotFoundResponse, 
  ApiConflictResponse,
  ApiCommonErrorResponses 
} from '../../shared/decorators/api-entity-response-decorator';
import { PokemonEntity } from '../../pokemon/entities/pokemon.entity';

export const ApiActualizarFavoritos = () =>
  applyDecorators(
    ApiOperation({ 
      summary: 'Actualizar lista completa de favoritos de un usuario',
      description: 'Reemplaza completamente la lista de Pokemon favoritos del usuario con la nueva lista proporcionada'
    }),
    ApiParam({ 
      name: 'usuarioId', 
      description: 'ID del usuario', 
      type: 'number',
      example: 1 
    }),
    ApiBody({
      description: 'Lista de IDs de Pokemon favoritos',
      schema: {
        type: 'object',
        properties: {
          pokemonIds: {
            type: 'array',
            items: { type: 'number' },
            example: [1, 25, 150],
            description: 'Array de IDs de Pokemon favoritos'
          }
        },
        required: ['pokemonIds']
      }
    }),
    ApiOkResponse(PokemonEntity, 'Favoritos actualizados exitosamente (retorna void)', null),
    ApiNotFoundResponse('Usuario o Pokemon'),
    ApiCommonErrorResponses()
  );

export const ApiObtenerFavoritos = () =>
  applyDecorators(
    ApiOperation({ 
      summary: 'Obtener favoritos de un usuario',
      description: 'Recupera todos los Pokemon favoritos de un usuario específico con información completa'
    }),
    ApiParam({ 
      name: 'usuarioId', 
      description: 'ID del usuario', 
      type: 'number',
      example: 1 
    }),
    // Usamos array response porque retorna múltiples Pokemon
    ApiOkResponse(PokemonEntity, 'Lista de Pokemon favoritos', [
      {
        id: 25,
        nombre: 'Pikachu',
        descripcion: 'When several of these Pokémon gather, their electricity could build and cause lightning storms.',
        imagen: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
        grunido: 'pika-pika',
        types: 'electric',
        tipoPokemon: [
          {
            nombre: 'electric'
          }
        ]
      }
    ]),
    ApiNotFoundResponse('Usuario'),
    ApiCommonErrorResponses()
  );

export const ApiAgregarFavorito = () =>
  applyDecorators(
    ApiOperation({ 
      summary: 'Agregar Pokemon a favoritos',
      description: 'Agrega un Pokemon específico a la lista de favoritos del usuario. Si ya existe, no se duplicará.'
    }),
    ApiParam({ 
      name: 'usuarioId', 
      description: 'ID del usuario', 
      type: 'number',
      example: 1 
    }),
    ApiParam({ 
      name: 'pokemonId', 
      description: 'ID del Pokemon a agregar', 
      type: 'number',
      example: 25 
    }),
    ApiCreatedResponse(PokemonEntity, 'Pokemon agregado a favoritos exitosamente (retorna void)', null),
    ApiNotFoundResponse('Usuario o Pokemon'),
    ApiConflictResponse('Pokemon ya está en favoritos'),
    ApiCommonErrorResponses()
  );

export const ApiRemoverFavorito = () =>
  applyDecorators(
    ApiOperation({ 
      summary: 'Remover Pokemon de favoritos',
      description: 'Remueve un Pokemon específico de la lista de favoritos del usuario'
    }),
    ApiParam({ 
      name: 'usuarioId', 
      description: 'ID del usuario', 
      type: 'number',
      example: 1 
    }),
    ApiParam({ 
      name: 'pokemonId', 
      description: 'ID del Pokemon a remover', 
      type: 'number',
      example: 25 
    }),
    ApiOkResponse(PokemonEntity, 'Pokemon removido de favoritos exitosamente (retorna void)', null),
    ApiNotFoundResponse('Usuario'),
    ApiCommonErrorResponses()
  );
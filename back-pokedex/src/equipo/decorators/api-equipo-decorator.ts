import { ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

export const ApiCrearEquipo = () =>
  applyDecorators(
    ApiOperation({ 
      summary: 'Crear/actualizar equipo de usuario',
      description: 'Crea o actualiza completamente el equipo de Pokémon de un usuario. El equipo anterior será reemplazado. El primer Pokémon del array será el líder del equipo. Máximo 6 Pokémon por equipo.'
    }),
    ApiParam({ 
      name: 'usuarioId', 
      description: 'ID único del usuario propietario del equipo',
      type: 'number',
      example: 1,
      schema: { minimum: 1 }
    }),
    ApiBody({
      description: 'Lista de IDs de Pokémon para formar el equipo del usuario',
      schema: {
        type: 'object',
        properties: {
          pokemonIds: {
            type: 'array',
            items: { 
              type: 'number',
              minimum: 1
            },
            example: [1, 4, 7, 25, 150, 151],
            minItems: 1,
            maxItems: 6,
            description: 'Array de IDs de Pokémon únicos (mínimo 1, máximo 6). El primer Pokémon será el líder.'
          }
        },
        required: ['pokemonIds']
      }
    }),
    ApiResponse({ 
      status: 201, 
      description: 'Equipo creado/actualizado exitosamente',
      schema: {
        type: 'object',
        properties: {
          usuarioId: { type: 'number', example: 1 },
          username: { type: 'string', example: 'ash_ketchum' },
          totalPokemon: { type: 'number', example: 6 },
          equipo: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                posicion: { type: 'number', example: 1 },
                esLider: { type: 'boolean', example: true },
                pokemon: {
                  type: 'object',
                  properties: {
                    id: { type: 'number', example: 25 },
                    nombre: { type: 'string', example: 'Pikachu' },
                    imagen: { type: 'string', example: 'pikachu.png' },
                    types: { type: 'string', example: 'electric' }
                  }
                },
                fechaAgregado: { type: 'string', format: 'date-time' }
              }
            }
          }
        }
      }
    }),
    ApiResponse({ 
      status: 400, 
      description: 'Datos inválidos',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 400 },
          message: { 
            type: 'string', 
            example: 'No se pueden incluir Pokémon duplicados en el equipo' 
          }
        }
      }
    }),
    ApiResponse({ 
      status: 404, 
      description: 'Usuario o Pokémon no encontrado',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 404 },
          message: { 
            type: 'string', 
            example: 'Usuario con ID 1 no encontrado' 
          }
        }
      }
    })
  );

export const ApiObtenerEquipo = () =>
  applyDecorators(
    ApiOperation({ 
      summary: 'Obtener equipo de usuario',
      description: 'Obtiene el equipo completo de Pokémon de un usuario específico con toda la información detallada de cada Pokémon, ordenado por posición.'
    }),
    ApiParam({ 
      name: 'usuarioId', 
      description: 'ID único del usuario del cual se desea obtener el equipo',
      type: 'number',
      example: 1,
      schema: { minimum: 1 }
    }),
    ApiResponse({ 
      status: 200, 
      description: 'Equipo obtenido exitosamente',
      schema: {
        type: 'object',
        properties: {
          usuarioId: { type: 'number', example: 1 },
          username: { type: 'string', example: 'ash_ketchum' },
          totalPokemon: { type: 'number', example: 6 },
          equipo: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                posicion: { type: 'number', example: 1, description: 'Posición en el equipo (1-6)' },
                esLider: { type: 'boolean', example: true, description: 'Si es el Pokémon líder del equipo' },
                pokemon: {
                  type: 'object',
                  properties: {
                    id: { type: 'number', example: 25 },
                    nombre: { type: 'string', example: 'Pikachu' },
                    imagen: { type: 'string', example: 'pikachu.png' },
                    types: { type: 'string', example: 'electric' },
                    vida: { type: 'number', example: 35 },
                    ataque: { type: 'number', example: 55 },
                    defensa: { type: 'number', example: 40 },
                    ataqueEspecial: { type: 'number', example: 50 },
                    defensaEspecial: { type: 'number', example: 50 },
                    velocidad: { type: 'number', example: 90 }
                  }
                },
                fechaAgregado: { 
                  type: 'string', 
                  format: 'date-time',
                  example: '2025-10-31T12:00:00.000Z',
                  description: 'Fecha en que se agregó al equipo'
                }
              }
            }
          }
        }
      }
    }),
    ApiResponse({ 
      status: 404, 
      description: 'Usuario no encontrado',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 404 },
          message: { 
            type: 'string', 
            example: 'Usuario con ID 1 no encontrado' 
          }
        }
      }
    })
  );

export const ApiEliminarEquipo = () =>
  applyDecorators(
    ApiOperation({ 
      summary: 'Eliminar equipo de usuario',
      description: 'Elimina completamente el equipo de Pokémon de un usuario específico. Esta acción no se puede deshacer y removerá todos los Pokémon del equipo.'
    }),
    ApiParam({ 
      name: 'usuarioId', 
      description: 'ID único del usuario cuyo equipo se desea eliminar',
      type: 'number',
      example: 1,
      schema: { minimum: 1 }
    }),
    ApiResponse({ 
      status: 200, 
      description: 'Equipo eliminado exitosamente',
      schema: {
        type: 'object',
        properties: {
          message: { 
            type: 'string', 
            example: 'Equipo del usuario ash_ketchum eliminado exitosamente' 
          },
          pokemonRemovidos: { 
            type: 'number', 
            example: 6,
            description: 'Cantidad de Pokémon que fueron removidos del equipo'
          }
        }
      }
    }),
    ApiResponse({ 
      status: 404, 
      description: 'Usuario no encontrado',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 404 },
          message: { 
            type: 'string', 
            example: 'Usuario con ID 1 no encontrado' 
          }
        }
      }
    })
  );

export const ApiAgregarPokemon = () =>
  applyDecorators(
    ApiOperation({ 
      summary: 'Agregar Pokémon al equipo',
      description: 'Agrega un Pokémon individual al equipo de un usuario. El equipo debe tener menos de 6 Pokémon y el Pokémon no debe estar ya en el equipo.'
    }),
    ApiParam({ 
      name: 'usuarioId', 
      description: 'ID único del usuario al cual se agregará el Pokémon',
      type: 'number',
      example: 1,
      schema: { minimum: 1 }
    }),
    ApiBody({
      description: 'ID del Pokémon a agregar al equipo',
      schema: {
        type: 'object',
        properties: {
          pokemonId: {
            type: 'number',
            minimum: 1,
            example: 25,
            description: 'ID único del Pokémon a agregar'
          }
        },
        required: ['pokemonId']
      }
    }),
    ApiResponse({ 
      status: 201, 
      description: 'Pokémon agregado exitosamente al equipo',
      schema: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 25 },
          nombre: { type: 'string', example: 'Pikachu' },
          imagen: { type: 'string', example: 'pikachu.png' },
          types: { type: 'string', example: 'electric' },
          vida: { type: 'number', example: 35 },
          ataque: { type: 'number', example: 55 },
          defensa: { type: 'number', example: 40 },
          ataqueEspecial: { type: 'number', example: 50 },
          defensaEspecial: { type: 'number', example: 50 },
          velocidad: { type: 'number', example: 90 },
          posicion: { type: 'number', example: 1, description: 'Posición asignada en el equipo' },
          esLider: { type: 'boolean', example: true, description: 'Si es el líder del equipo' },
          fechaAgregado: { 
            type: 'string', 
            format: 'date-time',
            example: '2025-10-31T12:00:00.000Z'
          }
        }
      }
    }),
    ApiResponse({ 
      status: 400, 
      description: 'Error de validación',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 400 },
          message: { 
            type: 'string', 
            example: 'El equipo ya tiene el máximo de 6 Pokémon' 
          }
        }
      }
    }),
    ApiResponse({ 
      status: 404, 
      description: 'Usuario o Pokémon no encontrado',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 404 },
          message: { 
            type: 'string', 
            example: 'Pokémon con ID 25 no encontrado' 
          }
        }
      }
    })
  );

export const ApiEliminarPokemon = () =>
  applyDecorators(
    ApiOperation({ 
      summary: 'Eliminar Pokémon del equipo',
      description: 'Elimina un Pokémon específico del equipo de un usuario. Las posiciones del equipo se reorganizan automáticamente.'
    }),
    ApiParam({ 
      name: 'usuarioId', 
      description: 'ID único del usuario del cual se eliminará el Pokémon',
      type: 'number',
      example: 1,
      schema: { minimum: 1 }
    }),
    ApiParam({ 
      name: 'pokemonId', 
      description: 'ID único del Pokémon a eliminar del equipo',
      type: 'number',
      example: 25,
      schema: { minimum: 1 }
    }),
    ApiResponse({ 
      status: 200, 
      description: 'Pokémon eliminado exitosamente del equipo',
      schema: {
        type: 'object',
        properties: {
          message: { 
            type: 'string', 
            example: 'Pikachu eliminado del equipo exitosamente' 
          },
          pokemonEliminado: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 25 },
              nombre: { type: 'string', example: 'Pikachu' },
              posicion: { 
                type: 'number', 
                example: 1,
                description: 'Posición que tenía el Pokémon en el equipo antes de ser eliminado'
              }
            }
          }
        }
      }
    }),
    ApiResponse({ 
      status: 404, 
      description: 'Usuario no encontrado o Pokémon no está en el equipo',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 404 },
          message: { 
            type: 'string', 
            example: 'Este Pokémon no está en el equipo del usuario' 
          }
        }
      }
    })
  );
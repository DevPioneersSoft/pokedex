import { Type, applyDecorators } from '@nestjs/common';
import { ApiResponse, getSchemaPath, ApiExtraModels } from '@nestjs/swagger';

/**
 * Decorador genérico para respuestas de API que genera esquemas automáticamente
 * basándose en las entidades de NestJS/Swagger
 */
export function ApiEntityResponse<TModel extends Type<any>>(options: {
  status: number;
  description: string;
  type: TModel;
  isArray?: boolean;
  isPaginated?: boolean;
  example?: any;
}) {
  const { status, description, type, isArray = false, isPaginated = false, example } = options;

  let schema: any;

  if (isPaginated) {
    // Respuesta paginada con meta información
    schema = {
      type: 'object',
      properties: {
        data: isArray 
          ? {
              type: 'array',
              items: { $ref: getSchemaPath(type) }
            }
          : { $ref: getSchemaPath(type) },
        meta: {
          type: 'object',
          properties: {
            total: { type: 'number', example: 100 },
            page: { type: 'number', example: 1 },
            limit: { type: 'number', example: 10 },
            totalPages: { type: 'number', example: 10 }
          }
        }
      }
    };
  } else if (isArray) {
    // Respuesta de array simple
    schema = {
      type: 'array',
      items: { $ref: getSchemaPath(type) }
    };
  } else {
    // Respuesta de objeto simple
    schema = { $ref: getSchemaPath(type) };
  }

  // Si hay ejemplo personalizado, agregarlo
  if (example) {
    schema.example = example;
  }

  return applyDecorators(
    ApiExtraModels(type),
    ApiResponse({
      status,
      description,
      schema
    })
  );
}

/**
 * Decorador para respuesta de creación exitosa
 */
export function ApiCreatedResponse<TModel extends Type<any>>(
  type: TModel, 
  description: string = 'Recurso creado exitosamente',
  example?: any
) {
  return ApiEntityResponse({
    status: 201,
    description,
    type,
    example
  });
}

/**
 * Decorador para respuesta OK con una entidad
 */
export function ApiOkResponse<TModel extends Type<any>>(
  type: TModel, 
  description: string = 'Operación exitosa',
  example?: any
) {
  return ApiEntityResponse({
    status: 200,
    description,
    type,
    example
  });
}

/**
 * Decorador para respuesta OK con array de entidades
 */
export function ApiOkArrayResponse<TModel extends Type<any>>(
  type: TModel, 
  description: string = 'Lista de recursos',
  example?: any
) {
  return ApiEntityResponse({
    status: 200,
    description,
    type,
    isArray: true,
    example
  });
}

/**
 * Decorador para respuesta paginada
 */
export function ApiPaginatedResponse<TModel extends Type<any>>(
  type: TModel, 
  description: string = 'Lista paginada de recursos'
) {
  return ApiEntityResponse({
    status: 200,
    description,
    type,
    isArray: true,
    isPaginated: true
  });
}

/**
 * Decorador combinado para respuestas de error comunes
 */
export function ApiCommonErrorResponses() {
  return applyDecorators(
    ApiResponse({ status: 400, description: 'Datos inválidos' }),
    ApiResponse({ status: 401, description: 'No autorizado' }),
    ApiResponse({ status: 403, description: 'Prohibido' }),
    ApiResponse({ status: 404, description: 'Recurso no encontrado' }),
    ApiResponse({ status: 409, description: 'Conflicto' }),
    ApiResponse({ status: 500, description: 'Error interno del servidor' })
  );
}

/**
 * Decorador para respuestas específicas de recursos no encontrados
 */
export function ApiNotFoundResponse(resourceName: string = 'Recurso') {
  return ApiResponse({ 
    status: 404, 
    description: `${resourceName} no encontrado` 
  });
}

/**
 * Decorador para conflictos (recursos duplicados)
 */
export function ApiConflictResponse(message: string = 'El recurso ya existe') {
  return ApiResponse({ 
    status: 409, 
    description: message 
  });
}
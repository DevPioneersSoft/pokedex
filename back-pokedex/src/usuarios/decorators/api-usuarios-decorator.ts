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
import { UsuarioEntity } from '../entities/usuario.entity';

export const ApiCrearUsuario = () =>
  applyDecorators(
    ApiOperation({ 
      summary: 'Crear un nuevo usuario',
      description: 'Crea un nuevo usuario en el sistema. La contraseña será hasheada automáticamente usando Argon2.'
    }),
    ApiBody({
      description: 'Datos del nuevo usuario',
      schema: {
        type: 'object',
        properties: {
          username: {
            type: 'string',
            example: 'nuevo_usuario',
            description: 'Nombre de usuario único'
          },
          contrasena: {
            type: 'string',
            example: 'password123',
            description: 'Contraseña del usuario (será hasheada automáticamente)'
          }
        },
        required: ['username', 'contrasena']
      }
    }),
    ApiCreatedResponse(UsuarioEntity, 'Usuario creado exitosamente'),
    ApiConflictResponse('El username ya existe'),
    ApiCommonErrorResponses()
  );

export const ApiObtenerUsuarios = () =>
  applyDecorators(
    ApiOperation({ 
      summary: 'Obtener todos los usuarios con paginación',
      description: 'Recupera una lista paginada de usuarios con sus favoritos básicos. Las contraseñas no se incluyen en la respuesta por seguridad.'
    }),
    ApiPrismaQuery(),
    ApiPaginatedResponse(UsuarioEntity, 'Lista paginada de usuarios'),
    ApiCommonErrorResponses()
  );

export const ApiObtenerUsuario = () =>
  applyDecorators(
    ApiOperation({ 
      summary: 'Obtener un usuario por ID',
      description: 'Recupera un usuario específico con sus favoritos completos incluyendo tipos de Pokemon. La contraseña no se incluye por seguridad.'
    }),
    ApiParam({ 
      name: 'id', 
      description: 'ID único del usuario', 
      type: 'number',
      example: 1 
    }),
    ApiOkResponse(UsuarioEntity, 'Usuario encontrado'),
    ApiNotFoundResponse('Usuario'),
    ApiCommonErrorResponses()
  );

export const ApiActualizarUsuario = () =>
  applyDecorators(
    ApiOperation({ 
      summary: 'Actualizar un usuario',
      description: 'Actualiza los datos de un usuario existente. Si se proporciona una nueva contraseña, será hasheada automáticamente. El username debe ser único.'
    }),
    ApiParam({ 
      name: 'id', 
      description: 'ID único del usuario a actualizar', 
      type: 'number',
      example: 1 
    }),
    ApiBody({
      description: 'Datos a actualizar del usuario (todos los campos son opcionales)',
      schema: {
        type: 'object',
        properties: {
          username: {
            type: 'string',
            example: 'nuevo_username',
            description: 'Nuevo nombre de usuario (debe ser único)'
          },
          contrasena: {
            type: 'string',
            example: 'nueva_password123',
            description: 'Nueva contraseña (será hasheada automáticamente)'
          }
        }
      }
    }),
    ApiOkResponse(UsuarioEntity, 'Usuario actualizado exitosamente'),
    ApiNotFoundResponse('Usuario'),
    ApiConflictResponse('El username ya está en uso por otro usuario'),
    ApiCommonErrorResponses()
  );

export const ApiEliminarUsuario = () =>
  applyDecorators(
    ApiOperation({ 
      summary: 'Eliminar un usuario',
      description: 'Elimina un usuario del sistema y desconecta automáticamente todas sus relaciones de favoritos. Esta acción no se puede deshacer.'
    }),
    ApiParam({ 
      name: 'id', 
      description: 'ID único del usuario a eliminar', 
      type: 'number',
      example: 1 
    }),
    ApiOkResponse(UsuarioEntity, 'Usuario eliminado exitosamente'),
    ApiNotFoundResponse('Usuario'),
    ApiCommonErrorResponses()
  );

export const ApiAutenticarUsuario = () =>
  applyDecorators(
    ApiOperation({ 
      summary: 'Autenticar usuario',
      description: 'Autentica a un usuario mediante username y contraseña. Retorna los datos del usuario si las credenciales son válidas.'
    }),
    ApiBody({
      description: 'Credenciales de autenticación',
      schema: {
        type: 'object',
        properties: {
          username: {
            type: 'string',
            example: 'ash_ketchum',
            description: 'Nombre de usuario',
            minLength: 3
          },
          password: {
            type: 'string',
            example: 'miContraseña123',
            description: 'Contraseña del usuario',
            minLength: 6
          }
        },
        required: ['username', 'password']
      }
    }),
    ApiOkResponse(UsuarioEntity, 'Usuario autenticado exitosamente'),
    ApiNotFoundResponse('Usuario no encontrado o credenciales inválidas'),
    ApiCommonErrorResponses()
  );
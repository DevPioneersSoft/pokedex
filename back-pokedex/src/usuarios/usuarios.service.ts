import { Injectable, Logger, ConflictException, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaErrorHandlerService } from 'src/utils/prisma-error-handler.service';
import { UsuarioEntity } from './entities/usuario.entity';
import { PrismaQueryParamsDto } from 'src/shared/dto/prisma-query-params-dto';
import { PaginatedResponseDto } from 'src/shared/dto/paginated-response-dto';
import { buildPaginatedResponse } from 'src/shared/helpers/build-paginated-response';
import * as argon2 from 'argon2';

@Injectable()
export class UsuariosService {
  private readonly logger = new Logger(UsuariosService.name);
  private config: argon2.Options;

  constructor(
    private readonly prisma: PrismaService,
    private readonly prismaErrorHandler: PrismaErrorHandlerService,
    ) {
    this.config = {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      timeCost: 5,
      parallelism: 1,
    };
  }

  async create(createUsuarioDto: CreateUsuarioDto): Promise<UsuarioEntity> {
    try {
      const existingUser = await this.prisma.usuario.findUnique({
        where: { username: createUsuarioDto.username }
      });

      if (existingUser) {
        throw new ConflictException(`El usuario ${createUsuarioDto.username} ya existe`);
      }

      const hashedPassword = await argon2.hash(createUsuarioDto.contrasena, this.config);

      const usuario = await this.prisma.usuario.create({
        data: {
          username: createUsuarioDto.username,
          contrasena: hashedPassword,
        },
      });

      this.logger.log(`Usuario ${usuario.username} creado exitosamente`);
      return usuario;
    } catch (error) {
      this.prismaErrorHandler.handleError(error, 'Error al crear usuario');
    }
  }

  /**
   * Valida si una contraseña en texto plano coincide con el hash almacenado
   * @param plainPassword - Contraseña en texto plano a verificar
   * @param hashedPassword - Hash de la contraseña almacenado en la base de datos
   * @returns true si la contraseña es correcta, false en caso contrario
   */
  async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    try {
      return await argon2.verify(hashedPassword, plainPassword);
    } catch (error) {
      this.logger.error('Error al validar contraseña', error);
      return false;
    }
  }

  /**
   * Busca un usuario por username y valida su contraseña
   * @param username - Nombre de usuario
   * @param password - Contraseña en texto plano
   * @returns El usuario si las credenciales son válidas, null en caso contrario
   */
  async validateUser(username: string, password: string): Promise<UsuarioEntity | null> {
    try {
      const usuario = await this.prisma.usuario.findUnique({
        where: { username }
      });

      if (!usuario) {
        return null;
      }

      const isPasswordValid = await this.validatePassword(password, usuario.contrasena);

      if (!isPasswordValid) {
        return null;
      }

      return usuario;
    } catch (error) {
      this.logger.error('Error al validar usuario', error);
      return null;
    }
  }

  /**
   * Autentica un usuario mediante username y contraseña
   * @param username - Nombre de usuario (usando como email/identificador)
   * @param password - Contraseña en texto plano
   * @returns El usuario autenticado
   * @throws NotFoundException si las credenciales son inválidas
   */
  async autenticar(username: string, password: string): Promise<UsuarioEntity> {
    try {
      const usuario = await this.validateUser(username, password);

      if (!usuario) {
        throw new NotFoundException('Credenciales inválidas');
      }

      this.logger.log(`Usuario ${usuario.username} autenticado exitosamente`);
      return usuario;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error('Error al autenticar usuario', error);
      throw new Error('Error interno del servidor');
    }
  }

  async findAll(params: PrismaQueryParamsDto): Promise<PaginatedResponseDto<UsuarioEntity>> {
    const { skip = 0, take = 10, where = {}, orderBy = {} } = params;
    try {
      this.logger.log('Obteniendo todos los usuarios');
      
      const [data, total] = await Promise.all([
        this.prisma.usuario.findMany({
          skip, 
          take, 
          where, 
          orderBy,
          include: {
            favoritos: {
              select: {
                id: true,
                nombre: true,
                imagen: true
              }
            }
          }
        }),
        this.prisma.usuario.count({ where })
      ]);

      // Remover contraseñas de la respuesta por seguridad
      const sanitizedData = data.map(usuario => {
        const { contrasena, ...usuarioSinContrasena } = usuario;
        return usuarioSinContrasena;
      });
      
      return buildPaginatedResponse<any>({ data: sanitizedData, total, skip, take });
    } catch (error) {
      this.prismaErrorHandler.handleError(error, 'Error al obtener usuarios');
    }
  }

  async findOne(id: number): Promise<Omit<UsuarioEntity, 'contrasena'> | null> {
    try {
      this.logger.log(`Obteniendo usuario con id: ${id}`);
      
      const usuario = await this.prisma.usuario.findUnique({
        where: { id },
        include: {
          favoritos: {
            select: {
              id: true,
              nombre: true,
              imagen: true,
              tipoPokemon: {
                select: {
                  nombre: true
                }
              }
            }
          }
        }
      });

      if (!usuario) {
        this.logger.warn(`Usuario con ID ${id} no encontrado`);
        throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
      }

      return usuario;
    } catch (error) {
      this.prismaErrorHandler.handleError(error, `Error al obtener usuario ${id}`);
    }
  }

  async findByUsername(username: string): Promise<UsuarioEntity | null> {
    try {
      this.logger.log(`Obteniendo usuario con username: ${username}`);

      const usuario = await this.prisma.usuario.findUnique({
        where: { username },
        include: {
          favoritos: {
            select: {
              id: true,
              nombre: true,
              imagen: true,
              tipoPokemon: {
                select: {
                  nombre: true
                }
              }
            }
          }
        }
      });

      if (!usuario) {
        this.logger.warn(`Usuario con username ${username} no encontrado`);
        throw new NotFoundException(`Usuario con username ${username} no encontrado`);
      }
      
      return usuario;
    } catch (error) {
      this.prismaErrorHandler.handleError(error, `Error al obtener usuario ${username}`);
    }
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Omit<UsuarioEntity, 'contrasena'>> {
    try {
      this.logger.log(`Actualizando usuario con id: ${id}`);

      // Verificar si el usuario existe
      const existingUsuario = await this.prisma.usuario.findUnique({
        where: { id }
      });

      if (!existingUsuario) {
        throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
      }

      // Si se actualiza el username, verificar que no exista otro usuario con ese username
      if (updateUsuarioDto.username && updateUsuarioDto.username !== existingUsuario.username) {
        const existingUsernameUser = await this.prisma.usuario.findUnique({
          where: { username: updateUsuarioDto.username }
        });

        if (existingUsernameUser) {
          throw new ConflictException(`El username ${updateUsuarioDto.username} ya está en uso`);
        }
      }

      // Preparar datos para actualizar
      let updateData: any = {};
      
      if (updateUsuarioDto.username) {
        updateData.username = updateUsuarioDto.username;
      }

      // Si se actualiza la contraseña, hashearla
      if (updateUsuarioDto.contrasena) {
        updateData.contrasena = await argon2.hash(updateUsuarioDto.contrasena, this.config);
      }

      const usuario = await this.prisma.usuario.update({
        where: { id },
        data: updateData,
        include: {
          favoritos: {
            select: {
              id: true,
              nombre: true,
              imagen: true
            }
          }
        }
      });

      this.logger.log(`Usuario ${usuario.username} actualizado exitosamente`);
      
      // Remover contraseña de la respuesta por seguridad
      const { contrasena, ...usuarioSinContrasena } = usuario;
      return usuarioSinContrasena;
    } catch (error) {
      this.prismaErrorHandler.handleError(error, `Error al actualizar usuario ${id}`);
    }
  }

  async remove(id: number): Promise<Omit<UsuarioEntity, 'contrasena'>> {
    try {
      this.logger.log(`Eliminando usuario con id: ${id}`);

      // Verificar si el usuario existe
      const existingUsuario = await this.prisma.usuario.findUnique({
        where: { id },
        include: {
          favoritos: {
            select: {
              id: true,
              nombre: true,
              imagen: true
            }
          }
        }
      });

      if (!existingUsuario) {
        throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
      }

      // Primero desconectar las relaciones de favoritos
      await this.prisma.usuario.update({
        where: { id },
        data: {
          favoritos: {
            set: []
          }
        }
      });

      // Luego eliminar el usuario
      await this.prisma.usuario.delete({
        where: { id },
      });

      this.logger.log(`Usuario ${existingUsuario.username} eliminado exitosamente`);
      
      // Remover contraseña de la respuesta por seguridad
      const { contrasena, ...usuarioSinContrasena } = existingUsuario;
      return usuarioSinContrasena;
    } catch (error) {
      this.prismaErrorHandler.handleError(error, `Error al eliminar usuario ${id}`);
    }
  }
}

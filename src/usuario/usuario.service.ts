import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuarioService {

  /// se llama a prisma para poder manipular los datos de la tabla del esquema de prisma
  constructor(private readonly prisma: PrismaService) { }
  private readonly logger = new Logger(UsuarioService.apply.name)

  async create(data: CreateUsuarioDto): Promise<Usuario> {
    try {
      const nuevoUsuario = await this.prisma.usuario.create({
        data
      })
      // Log exitoso
      this.logger.log(`✅ Usuario creado correctamente: ${data.username}`);
      return nuevoUsuario;

    } catch (error) {
      throw error
    }
  }

  async findAll() {
    try {
      return await this.prisma.usuario.findMany();
    } catch (error) {
      throw error
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.usuario.findUnique({
        where: {
          id
        }
      })
    } catch (error) {
      throw error
    }
  }

  async update(id: number, newData: UpdateUsuarioDto) {
    try {
      return await this.prisma.usuario.update({
        where: {
          id: id
        },
        data: newData
      })
    } catch (error) {
      throw error
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.usuario.delete({
        where: {
          id: id
        }
      })
    } catch (error) {
      if (error.code === 'P2025') { // P2025 error especifico de prisma indica que no se encontro
        throw new NotFoundException(`No se encontro pokemon con id ${id}`)
      }
      throw error
    }
  }
}

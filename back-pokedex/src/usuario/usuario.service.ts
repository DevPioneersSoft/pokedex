import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuarioService {

  constructor(private readonly prisma: PrismaService) { }

  async create(data: CreateUsuarioDto) {
    try {
      return await this.prisma.usuario.create({
        data
      })
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.prisma.usuario.findMany();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.usuario.findUnique({
        where: {
          id
        }
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, data: UpdateUsuarioDto) {
    try {
      return await this.prisma.usuario.update({
        where: {
          id
        },
        data
      })
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.usuario.delete({
        where: {
          id
        }
      })
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`No se encontró el usuario con id: ${id}`)
      }
      throw error;
    }
  }
}

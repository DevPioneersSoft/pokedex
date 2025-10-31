import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import * as argon2 from "argon2";
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuarioService {

  private config: argon2.Options;

  constructor(private readonly prisma: PrismaService) {
    this.config = {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      hashLength: 50,
      parallelism: 2,
    };
  }

  async create(data: CreateUsuarioDto) {
    try {

      if (data.contrasena) {
        const hash = await argon2.hash(data.contrasena, this.config);
        data.contrasena = hash;
      }

      return await this.prisma.usuario.create({
        data
      })
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException(`Ya existe un usuario con ese el nombre de usuario: ${data.username}`)
      }
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

      if (data.contrasena) {
        const hash = await argon2.hash(data.contrasena, this.config);
        data.contrasena = hash;
      }

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
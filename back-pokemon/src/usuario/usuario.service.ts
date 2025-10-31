import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import * as argon2 from 'argon2';

@Injectable()
export class UsuarioService {

  private config: argon2.Options;

  constructor(private readonly prisma: PrismaService) {
    this.config = {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      timeCost: 3,
      parallelism: 2,
      hashLength: 50,
    };
  }

  async create(createUsuarioDto: CreateUsuarioDto) {
    try {
      if (createUsuarioDto.contrasena) {
        createUsuarioDto.contrasena = await argon2.hash(createUsuarioDto.contrasena, this.config);
      }
      return this.prisma.usuario.create({ data: createUsuarioDto });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new Error('El usuario ya está en uso');
      }
      throw new Error('Error al crear el usuario');
    }
  }

  findAll() {
    return this.prisma.usuario.findMany();
  }

  findOne(id: number) {
    return this.prisma.usuario.findUnique({
      where: { id },
      include: { favoritos: true },
    });
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    if (updateUsuarioDto.contrasena) {
      updateUsuarioDto.contrasena = await argon2.hash(updateUsuarioDto.contrasena, this.config);
    }
    return this.prisma.usuario.update({ where: { id }, data: updateUsuarioDto });
  }

  remove(id: number) {
    return this.prisma.usuario.delete({ where: { id } });
  }
}

import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Usuario } from './entities/usuario.entity';
import * as argon2 from 'argon2'

@Injectable()
export class UsuarioService {

  private config: argon2.Options;
  /// se llama a prisma para poder manipular los datos de la tabla del esquema de prisma
  constructor(private readonly prisma: PrismaService) {

    //configuracion de incraptacion de contra
    this.config = {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      hashLength : 50,
      parallelism: 2
    }
  }

  private readonly logger = new Logger(UsuarioService.apply.name)

  async create(data: CreateUsuarioDto): Promise<Usuario> {
    try {

      if(data.contrasena){
        const hash =  await argon2.hash(data.contrasena, this.config);
        data.contrasena = hash;
      }


      const nuevoUsuario = await this.prisma.usuario.create({
        data
      })
      // Log exitoso
      this.logger.log(`✅ Usuario creado correctamente: ${data.username}`);
      return nuevoUsuario;

    } catch (error) {
      if(error.code === 'P2002'){/// error poruqe ya existe usuario ya que en la bd pusimos que el username es unico
        throw new ConflictException(`Ya exite usuario con el nombre ${data.username}`)
      }
      throw error;
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

      if(newData.contrasena){
        const hash =  await argon2.hash(newData.contrasena, this.config);
        newData.contrasena = hash;
      }

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

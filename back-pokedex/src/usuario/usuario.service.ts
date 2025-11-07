import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuarioService {

  constructor(private readonly prisma: PrismaService){
  
  }
    
  async create(data: CreateUsuarioDto) : Promise<Usuario> {
    try {
      return this.prisma.usuario.create({
         data
      })
    } catch (error) {
      throw error;
    }
  }

  async findAll() : Promise<Usuario[]> {
    try {
      return this.prisma.usuario.findMany();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) : Promise<Usuario | null> {
     try {
      return this.prisma.usuario.findUnique({
         where:{
          id
         }
      })
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, data: UpdateUsuarioDto) : Promise<Usuario> {
    try {
      return this.prisma.usuario.update({
        where:{
          id
        }, 
        data
      })
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) : Promise<Usuario> {
    try {
      return this.prisma.usuario.delete({
         where:{
          id
         }
      })
    } catch (error) {
      if(error.code === 'p2025'){
        throw new NotFoundException(`No se encontró el pokemon con id: ${id}`);
      } else{
        throw error;
      }
    }
  }
}

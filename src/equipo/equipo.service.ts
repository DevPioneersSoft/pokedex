import { ConflictException, Injectable } from '@nestjs/common';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { EquipoDto } from './dto/equipo.dto';
import { EquipoPrueba2Dto } from './dto/equipo.prueba2.dto';

@Injectable()
export class EquipoService {

  constructor(private readonly prisma: PrismaService){}

  async create(data: EquipoPrueba2Dto) {
        try {
          return await this.prisma.equipo.create({
               data: {
                nombre: data.nombre,              
                usuario: { connect: { id: data.id_usuario } },
                pokemones: { connect: data.pokemones.map(id => ({ id })) },
              }
          });
        } catch (error) {        
          throw error;
        }
  }

  async findAll() {
        try {
          return await this.prisma.equipo.findMany({
            include:{
              pokemones: true,
              usuario: true
            }
          });
        } catch (error) {        
          throw error;
        }
  }

  async findOne(id: number) {
    try {
    return await this.prisma.equipo.findUnique({
       where: {
          id
        },
        include:{
         pokemones: true,
         usuario: true
        }
    });
  } catch (error) {        
    throw error;
  }
  }

  update(id: number, updateEquipoDto: UpdateEquipoDto) {
    return `This action updates a #${id} equipo`;
  }

  remove(id: number) {
    return `This action removes a #${id} equipo`;
  }
}

import { Injectable } from '@nestjs/common';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Equipo } from './entities/equipo.entity';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';

@Injectable()
export class EquipoService {

  constructor(private prisma: PrismaService){}

  async actualizarEquipo(pokemonesId:number[], usuarioId: number): Promise<void> {        
        try{
           await this.prisma.usuario.update({
            where:{
              id: usuarioId
            },
            data: {
                equipo:{
                    set: pokemonesId.map(id => ({id})),
                },
            }
          })
        } catch (error){
          throw error
    }
  }

  async findTeamById(id: number, returnIdArray: number): Promise<number[] | Pokemon[] | undefined>{
      try{
        const resultSet = await this.prisma.usuario.findUnique({
          where: {
            id
          },
          include: {
            equipo: true, // Includes all related Equipo records
          },
        });

        if(returnIdArray == 1)
        return resultSet?.equipo.map((pokemon) => {return pokemon.id})
        else
        return resultSet?.equipo

      } catch (error){
        throw error;
      }  
  }
  

  create(createEquipoDto: CreateEquipoDto) {
    return 'This action adds a new equipo';
  }

  findAll() {
    return `This action returns all equipo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} equipo`;
  }

  update(id: number, updateEquipoDto: UpdateEquipoDto) {
    return `This action updates a #${id} equipo`;
  }

  remove(id: number) {
    return `This action removes a #${id} equipo`;
  }
}

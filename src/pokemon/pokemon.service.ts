import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Pokemon } from './entities/pokemon.entity';
import { PokemonDto } from './dto/pokemon.dto';

@Injectable()
export class PokemonService {

  /// se llama a prisma para poder manipular los datos de la tabla del esquema de prisma
  constructor(private readonly prisma:PrismaService){}

  async create(data: CreatePokemonDto): Promise<Pokemon> {
    try {
     return await this.prisma.pokemon.create({
        data
      })
    } catch (error) {
      throw  error
    }
  }

  async findAll() {
    try {
     return await this.prisma.pokemon.findMany()
    } catch (error) {
      throw  error
    }
  }

 async findOne(id: number) : Promise<PokemonDto | null>{
     try {
      return await this.prisma.pokemon.findUnique({
        where:{
          id
        },
        include:{
          tipo_pokemon : true
        }
      })
    } catch (error) {
      throw  error
    }
  }

  async update(id: number, data: UpdatePokemonDto) {
   try {
     return await this.prisma.pokemon.update({
      where:{
        id: id
      },
      data
     })
    } catch (error) {
      throw  error
    }
  }

 async remove(id: number) {
    try {
     return await this.prisma.pokemon.delete({
      where:{
        id: id
      }
     })
    } catch (error) {
      if(error.code==='P2025'){ // P2025 error especifico de prisma indica que no se encontro
         throw new NotFoundException(`No se encontro pokemon con id ${id}`)
      }
      throw  error
    }
  }
}

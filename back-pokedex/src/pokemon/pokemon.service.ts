import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Pokemon } from './entities/pokemon.entity';
import { PokemonDto } from './dto/pokemon.dto';

@Injectable()
export class PokemonService {

  constructor(private readonly prisma: PrismaService){

  }

  async create(data: CreatePokemonDto) : Promise<Pokemon> {
    try {
      return this.prisma.pokemon.create({
        data : data
      })
    } catch (error) {
      throw error;
    }
  }

 async findAll() : Promise<Pokemon[]> {
   try {
      return this.prisma.pokemon.findMany();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) : Promise<PokemonDto | null> {
    try {
      return await this.prisma.pokemon.findUnique({
        where:{
          id
        },
        include:{
          tipo_pokemon:true
        }
      });
    } catch (error) {
      throw error;
    }
  }

 async update(id: number, data: UpdatePokemonDto) : Promise<Pokemon> {
  try {
      return this.prisma.pokemon.update({
        where:{
          id
        },
        data : data
      })
    } catch (error) {
      throw error;
    }
  }

 async remove(id: number) : Promise<Pokemon> {
    try {
      return this.prisma.pokemon.delete({
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

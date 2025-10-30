import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Pokemon } from './entities/pokemon.entity';
import { PokemonDto } from './dto/pokemon.dto';

@Injectable()
export class PokemonService {

  constructor(private readonly prisma: PrismaService){}

  async create(data: CreatePokemonDto) : Promise<Pokemon> {
    try {
      return await this.prisma.pokemon.create({
        data : data
      });
    } catch (error) {
      throw error;
    }    
  }

  async findAll(): Promise<Pokemon[]> {
    try {
      return await this.prisma.pokemon.findMany({
        take: 10,
        skip: 0,
        where:{
          nombre:{
            startsWith: 'b'
          },
          vida:{
            gte:45
          }
        }
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<PokemonDto | null> {
    try {
      return await this.prisma.pokemon.findUnique({
        where: {
          id
        },
        include:{
          tipoPokemon: true
        }
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, data: UpdatePokemonDto) : Promise<Pokemon> {
    try {
        return await this.prisma.pokemon.update({
          where : {
            id
          },
          data
        });      
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number): Promise<Pokemon> {
    try {
      return await this.prisma.pokemon.delete({
        where: {
          id
        }
      });
    } catch (error) {
      if(error.code === 'P2025'){
            throw new NotFoundException(`No se encontró el pokemon con id: ${id}`);
      }
      throw error;
    }
  }
}
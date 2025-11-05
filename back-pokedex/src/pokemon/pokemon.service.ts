import { Injectable } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Pokemon } from './entities/pokemon.entity';
import { PokemonDto } from './dto/pokemon.dto';
import { PrismaQueryParamsDto } from 'src/shared/dto/prisma-query-params.dto';
import { PaginatedResponseDto } from 'src/shared/dto/paginated-response.dto';
import { buildPaginatedResponse } from 'src/shared/helpers/build-paginated-response';

@Injectable()
export class PokemonService {

  constructor (private readonly prisma: PrismaService){
  }

  async create(data: CreatePokemonDto): Promise<Pokemon> {
    try{
      return await this.prisma.pokemon.create({
        data
      })
    } catch (error){
      throw error
    }
  }

  async findAll(params: PrismaQueryParamsDto): Promise<PaginatedResponseDto<Pokemon>> {
    
    const {skip, take, where, orderBy} = params
    
    try{
    const[data, total] = await Promise.all([
      this.prisma.pokemon.findMany({
        skip,
        take,
        where,
        orderBy
      }),
      this.prisma.pokemon.count({
        where
      })
    ]);

      return buildPaginatedResponse({data, total, skip, take})
    } catch (error){
      throw error
    }
  }

  async findOne(id: number): Promise<PokemonDto | null> {
    try{
      return await this.prisma.pokemon.findUnique({
        where: {
          id
        },
        include: {
          tipo_pokemon: true
        }
      });
    } catch (error){
      throw error;
    }  
  }

  async update(id: number, data: UpdatePokemonDto): Promise<Pokemon> {
    try{
      return await this.prisma.pokemon.update({
        where:{
          id
        },
        data
      })
    } catch (error){
      throw error
    }
  }

  async remove(id: number): Promise<Pokemon> {
    try{
      return await this.prisma.pokemon.delete({
        where:{
          id
        }
      })
    } catch (error){
      throw error
    }
  }
}

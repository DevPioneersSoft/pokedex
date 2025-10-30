import { Injectable } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {


  constructor(private readonly prisma: PrismaService){

  }

  create(data: CreatePokemonDto): Promise<Pokemon> {

      try{
        return await this.prisma.create(

        )
        
      }catch(error){

      }
    // return 'This action adds a new pokemon';
  }

  findAll(): Promise<Pokemon[]> {
    return `This action returns all pokemon`;
  }

  async findOne(id: number): Promise<Pokemon | null> {
      try{
          return await this.prisma.pokemon.findUnique(
            {
                where: {
                  id
                },
                include:{
                  
                }
            }
          ) 
      }catch(error){

      }

  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}

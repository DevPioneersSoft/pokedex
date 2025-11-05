import { Injectable } from '@nestjs/common';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoritosService {

    constructor(private prisma: PrismaService){}

    async actualizarFavoritos(pokemonesId:number[], usuarioId: number): Promise<void> {        
        try{
           await this.prisma.usuario.update({
            where:{
              id: usuarioId
            },
            data: {
                favoritos:{
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
                favoritos: true, // Includes all related Equipo records
              },
            });
    
            if(returnIdArray == 1)
            return resultSet?.favoritos.map((pokemon) => {return pokemon.id})
            else
            return resultSet?.favoritos
    
        } catch (error){
            throw error;
        }  
    }

}

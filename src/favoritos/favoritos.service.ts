import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FavoritosDto } from 'src/usuario/dto/favoritos.dto';

@Injectable()
export class FavoritosService {
    constructor (private prisma: PrismaService){}
    private logger =  new Logger(FavoritosService.name);
    
    async actualizarFavoritos(dto: FavoritosDto): Promise<void>{
        const {pokemones, userId} = dto;
        this.logger.log(`actualizando favoritos para el usuario ${userId}: ${JSON.stringify(pokemones)}`)
        await this.prisma.usuario.update({
            where:{id:userId},
            data:{
                favoritos:{
                    set: pokemones.map((id) => ({id})),
                }
            },
        })
    } 
}

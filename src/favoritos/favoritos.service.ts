import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoritosService {
    constructor(private readonly prisma : PrismaService){}

    async actualizarFavoritos(pokemonesIds: number[], usuarioId: number) : Promise<void>{
        await this.prisma.usuario.update({
            where : {id : usuarioId},
            data: {
                favoritos:{
                    set: pokemonesIds.map(id =>({id}))
                }
            }
        });
    }
}

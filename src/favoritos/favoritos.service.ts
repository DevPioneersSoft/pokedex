import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FavoritoDto } from './dto/favorito.dto';

@Injectable()
export class FavoritosService {
    constructor(private readonly prisma : PrismaService){}

    async actualizarFavoritos(data : FavoritoDto) : Promise<void>{
        await this.prisma.usuario.update({
            where : {id : data.usuarioId},
            data: {
                favoritos:{
                    set: data.pokemonesIds.map(id =>({id}))
                }
            }
        });
    }
}

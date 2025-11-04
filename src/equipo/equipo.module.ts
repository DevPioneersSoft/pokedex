import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { EquipoService } from './equipo.service';
import { EquipoController } from './equipo.controller';
import { ShinyMiddleware } from 'src/shiny/shiny.middleware';
import path from 'path';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports:[],
  controllers: [EquipoController],
  providers: [EquipoService,PrismaService],
})
export class EquipoModule {

configure(consumer: MiddlewareConsumer){ /// implementacion del middleeare shiny aplicado solo al modulo de equipo a sus rutas
  consumer.apply(ShinyMiddleware)
  //.exclude({path:'equipo',method:RequestMethod.GET})/// aqui lo excluyes a un determinado path y metodo.
  //.forRoutes(EquipoController)// permite a todo el controlador
  .forRoutes({path:'equipo',method:RequestMethod.ALL})// solo para la ruta del path que tenga equipo

}

}

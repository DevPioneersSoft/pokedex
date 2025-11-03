import { Module, RequestMethod } from '@nestjs/common';
import { EquipoService } from './equipo.service';
import { EquipoController } from './equipo.controller';
import { MiddlewareBuilder } from '@nestjs/core';
import { ShinyMiddleware } from 'src/shiny/shiny.middleware';
import { Exclude } from 'class-transformer';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [EquipoController],
  providers: [EquipoService, PrismaService],
})
export class EquipoModule {
  configure(consumer: MiddlewareBuilder){
    consumer.apply(ShinyMiddleware)
    // .forRoutes({path: 'Equipo'., method : RequestMethod.ALL}) //para excuir ciertas rutas
    // .forRoutes(EquipoController)//para todo el controlador
    .forRoutes({//para ciertas rutas de equipo y que contengan el metodo
      path: 'equipo', method : RequestMethod.ALL
    })
  }
}

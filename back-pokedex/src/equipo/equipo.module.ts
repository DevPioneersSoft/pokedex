import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { EquipoService } from './equipo.service';
import { EquipoController } from './equipo.controller';
import { ShinyMiddleware } from 'src/shiny/shiny.middleware';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [EquipoController],
  providers: [EquipoService, PrismaService],

})
export class EquipoModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ShinyMiddleware)
    .exclude({
      path: 'equipo', method: RequestMethod.GET
    })
    .forRoutes({
      path: 'equipo', method: RequestMethod.POST
    })
  }
}

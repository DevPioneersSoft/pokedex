import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ShinyMiddleware } from 'src/shiny/shiny.middleware';
import { EquipoController } from './equipo.controller';
import { EquipoService } from './equipo.service';

@Module({
  controllers: [EquipoController],
  providers: [EquipoService],
})
export class EquipoModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ShinyMiddleware)
      //.exclude({ path: 'equipo', method: RequestMethod.GET })
      //.forRoutes(EquipoController);
      .forRoutes({ path: 'equipo', method: RequestMethod.ALL });
  }
}

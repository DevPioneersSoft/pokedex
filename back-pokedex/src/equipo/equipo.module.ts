import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { EquipoService } from './equipo.service';
import { EquipoController } from './equipo.controller';
import { ShinyMiddleware } from 'src/shiny/shiny.middleware';
import { PrismaErrorHandlerService } from 'src/utils/prisma-error-handler.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [EquipoController],
  providers: [EquipoService, PrismaService, PrismaErrorHandlerService],
})
export class EquipoModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ShinyMiddleware)
      // .forRoutes(EquipoController);
      .forRoutes({ path: 'equipo', method: RequestMethod.ALL });
  }

}

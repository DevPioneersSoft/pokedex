import { Module } from '@nestjs/common';
import { PruebaService } from './prueba.service';
import { PruebaController } from './prueba.controller';

@Module({
  providers: [PruebaService],
  controllers: [PruebaController],
})
export class PruebaModule {}

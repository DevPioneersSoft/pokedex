import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { PokemonModule } from './pokemon/pokemon.module';
import { UsuarioModule } from './usuario/usuario.module';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';
import { FavoritosService } from './favoritos/favoritos.service';
import { PokedexLoggerMiddleware } from './shared/middlewares/pokedex-logger/pokedex-logger.middleware';

@Module({
  imports: [PokemonModule, UsuarioModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [],
  providers: [PrismaService, FavoritosService],
  exports: [PrismaService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PokedexLoggerMiddleware).forRoutes('*');
  }
}
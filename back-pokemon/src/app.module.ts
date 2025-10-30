import { Module } from '@nestjs/common';
import { PokemonModule } from './pokemon/pokemon.module';
import { UsuarioModule } from './usuario/usuario.module';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PokemonModule, UsuarioModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
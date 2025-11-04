import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EquipoService {
  constructor(private prisma: PrismaService) { }

  // async findAllByUsuarioId(id: number): Promise<PokemonDto[]> {
  //   const favoritos = await this.prisma.equipo.findMany({
  //     where: {
  //       usuarioId: id,
  //     },
  //     include: {
  //       pokemon: {
  //         include: {
  //           tipoPokemon: true,
  //         },
  //       },
  //     },
  //   });

  //   return favoritos.map((i) => ({
  //     ...i.pokemon,
  //     imagen: i.shiny
  //       ? i.pokemon.imagen.split('/').toSpliced(10, 0, 'shiny').join('/')
  //       : i.pokemon.imagen,
  //   }));
  // }

  // async upsert(
  //   dto: UpsertEquipoDto[],
  //   user: Payload,
  //   shinyFound = false,
  // ): Promise<void> {
  //   if (shinyFound) {
  //     console.log(
  //       `🎁 Bonus para el usuario ${user.username}, encontró un shiny!`,
  //     );
  //   }

  //   await this.prisma.equipo.deleteMany({
  //     where: {
  //       usuarioId: user.id,
  //       // pokemonId: {
  //       //   notIn: dto.map(i => i.pokemonId)
  //       // }
  //     },
  //   });

  //   let shinyPokemonId: number | null = null;
  //   if (shinyFound && dto.length > 0) {
  //     const randomIndex = Math.floor(Math.random() * dto.length);
  //     shinyPokemonId = dto[randomIndex].pokemonId;
  //     console.log(`✨ El pokémon con ID ${shinyPokemonId} será shiny!`);
  //   }

  //   await this.prisma.equipo.createMany({
  //     data: dto.map((i) => ({
  //       pokemonId: i.pokemonId,
  //       usuarioId: user.id,
  //       shiny: i.pokemonId === shinyPokemonId,
  //     })),
  //     skipDuplicates: true,
  //   });
  // }
}


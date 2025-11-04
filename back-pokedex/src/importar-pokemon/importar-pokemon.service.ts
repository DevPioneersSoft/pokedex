import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateImportarPokemonDto } from './dto/create-importar-pokemon.dto';
import { UpdateImportarPokemonDto } from './dto/update-importar-pokemon.dto';
import { ListaPokemon } from './dto/lista-pokemon.interface';
import { PokemonDetalle } from './dto/pokemon-detalle.interface';
import { PokemonEspecies } from './dto/pokemon-especies.interface';
import { PrismaService } from '../prisma/prisma.service';
import { count } from 'rxjs/internal/operators/count';

@Injectable()
export class ImportarPokemonService implements OnModuleInit {
  
  private readonly BASE_URL = 'https://pokeapi.co/api/v2/';

  private readonly logger = new Logger(ImportarPokemonService.name);
  
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    const count = await this.prisma.pokemon.count();
    if (count === 0) {
      this.logger.log('No hay pokemones en la base de datos. Iniciando importación automática...');
      await this.importPokemon();
      this.logger.log('Importación automática completada.');
    } else {
      this.logger.log(`Hay ${count} pokemones en la base de datos. No se realizará la importación automática.`);
    }
  }

  async importPokemon() {
    try {
      const resp = await fetch(`${this.BASE_URL}pokemon?limit=1050&offset=0`);
      if (!resp.ok) {
        throw new Error('Ha ocurrido un error al obtener la lista de pokemones');
      }

      const pokemones = (await resp.json()) as ListaPokemon;

      const detallesSettled = await Promise.allSettled(
        pokemones.results.map(async ({ url }) => {
          const r = await fetch(`${url.endsWith('/') ? url.slice(0, -1) : url}`);
          if (!r.ok) {
            throw new Error(`Ha ocurrido un error al obtener detalles de ${url}`);
          }
          const pokemon = (await r.json()) as PokemonDetalle;

          const {species: {url: speciesUrl}} = pokemon;

          const speciesUrlFixed = speciesUrl.endsWith('/') ? speciesUrl.slice(0, -1) : speciesUrl;

          const speciesApi = await fetch(`${speciesUrlFixed}`);

          if (!speciesApi.ok) {
            throw new Error(`Ha ocurrido un error al obtener species de ${pokemon.id}`);
          }

          const especiesData = (await speciesApi.json()) as PokemonEspecies;


          return {pokemon, especiesData};
        })
      );

      // Filtrar solo los que se resolvieron correctamente y devolver sus valores
      const detalles: {pokemon: PokemonDetalle, especiesData: PokemonEspecies}[] = detallesSettled
        .filter((d): d is PromiseFulfilledResult<{pokemon: PokemonDetalle, especiesData: PokemonEspecies}> => d.status === 'fulfilled')
        .map(d => d.value);

      const tipos = new Set(detalles.flatMap(d => d.pokemon.types.map(t => t.type.name)));

      await this.prisma.tipoPokemon.createMany({
        data: Array.from(tipos).map((tipo) => ({ nombre: tipo })),
        skipDuplicates: true,
      });

      Promise.all(
        detalles.map(async ({pokemon, especiesData}) => {
          await this.registrarPokemon(pokemon, especiesData);
        })
      );

      return detalles;
    } catch (error) {
      console.error('ImportarPokemonesService.importar error:', error);
      throw error;
    }
  }

  async registrarPokemon(pokemon: PokemonDetalle, especie: PokemonEspecies): Promise<any> {
    const vida = pokemon.stats.find((i) => i.stat.name == 'hp')?.base_stat ?? 0;
    const ataque =
      pokemon.stats.find((i) => i.stat.name == 'attack')?.base_stat ?? 0;
    const ataqueEspecial =
      pokemon.stats.find((i) => i.stat.name == 'special-attack')?.base_stat ??
      0;
    const defensa =
      pokemon.stats.find((i) => i.stat.name == 'defense')?.base_stat ?? 0;
    const defensaEspecial =
      pokemon.stats.find((i) => i.stat.name == 'special-defense')?.base_stat ??
      0;
    const velocidad =
      pokemon.stats.find((i) => i.stat.name == 'speed')?.base_stat ?? 0;

    let descripcion = especie.flavor_text_entries.find(
      (i) => i.version.name == 'omega-ruby' && i.language.name == 'es',
    )?.flavor_text;
    if (!descripcion || descripcion.trim().length == 0) {
      const index = especie.flavor_text_entries.findLastIndex(
        (i) => i.language.name == 'es',
      );
      descripcion = especie.flavor_text_entries[index].flavor_text;
    }

    const imagen =
      pokemon.sprites.other?.['official-artwork'].front_default ??
      pokemon.sprites.front_default;

    try {
      const nuevoPokemon = await this.prisma.pokemon.create({
        data: {
          id: pokemon.id,
          nombre: pokemon.name,
          descripcion: descripcion.replace(/\n|\f/g, ' '),  
          types: pokemon.types.map(t => t.type.name).join(','),
          grunido: pokemon.cries.latest,
          imagen,
          vida,
          ataque, 
          defensa,
          ataqueEspecial,
          defensaEspecial,
          velocidad, 
          tipoPokemon: {
            connectOrCreate: pokemon.types.map((t) => ({ 
              where: { nombre: t.type.name },
              create: { nombre: t.type.name },
            })),
          },
        },
      });

      return nuevoPokemon;
    } catch (error) {
      console.error('Error al registrar Pokémon:', error);
      throw error;
    }
  }
  
}

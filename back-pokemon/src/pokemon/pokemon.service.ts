import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PokemonDetalles } from './dto/pokemonDetalle.interface';

import { buildPaginatedResponse } from '../shared/helpers/build-paginated-response';
import { Pokemon } from './entities/pokemon.entity';
import { PrismaQueryParamsDto } from 'src/shared/dto/prisma-query-params.dto';

@Injectable()
export class PokemonService {

  private readonly BASE_URL = 'https://pokeapi.co/api/v2/';

  constructor(private readonly prisma: PrismaService) {}

  create(createPokemonDto: CreatePokemonDto) {
    const { tipos, ...data } = createPokemonDto;

    return this.prisma.pokemon.create({
      data: {
        ...data,
        tipos: tipos && Array.isArray(tipos)
          ? {
              create: tipos.map((tipoNombre: string) => ({
                tipoPokemon: { connect: { nombre: tipoNombre } }
              }))
            }
          : undefined,
      },
      include: { tipos: true },
    });
  }

  async findAll(query: PrismaQueryParamsDto) {
    const { skip, take, orderBy, where } = query;
    const options: any = {
      include: { tipos: { include: { tipoPokemon: true } } },
      ...(typeof skip === 'number' ? { skip } : {}),
      ...(typeof take === 'number' ? { take } : {}),
      ...(orderBy ? { orderBy } : {}),
      ...(where ? { where } : {}),
    };
    const [data, total] = await Promise.all([
      this.prisma.pokemon.findMany(options),
      this.prisma.pokemon.count({ where: options.where }),
    ]);
    return buildPaginatedResponse({ data, total, skip, take });
  }

  findOne(id: number) : Promise<Pokemon | null> {
    return this.prisma.pokemon.findUnique({
      where: { id },
      include: { tipos: { include: { tipoPokemon: true } } },
    });
  }

  async update(id: number, updatePokemonDto: UpdatePokemonDto) {
    const { tipos, ...data } = updatePokemonDto;

    let tiposData: { deleteMany: {}; create: { tipoPokemon: { connect: { nombre: string } } }[] } | undefined = undefined;
    if (tipos && Array.isArray(tipos)) {
      tiposData = {
        deleteMany: {},
        create: tipos.map((tipoNombre: string) => ({
          tipoPokemon: { connect: { nombre: tipoNombre } }
        }))
      };
    }

    return this.prisma.pokemon.update({
      where: { id },
      data: {
        ...data,
        ...(tiposData ? { tipos: tiposData } : {}),
      },
      include: { tipos: { include: { tipoPokemon: true } } },
    });
  }

  async remove(id: number) {
    await this.prisma.pokemon.delete({ where: { id } });
    return { ok: true };
  }

  
  async find251() {
    try {
      const response = await fetch(`${this.BASE_URL}pokemon?limit=251&offset=0`);
      const jsonData = await response.json();
      
      const pokemonList: PokemonDetalles[] = await Promise.all(
        jsonData.results.map(async (pokemon: { url: string }) => {
          const detailResponse = await fetch(pokemon.url);
          const detailData = await detailResponse.json();
          return detailData as PokemonDetalles;
        })
      );

      return pokemonList;
    } catch (error) {
      console.error('Error fetching Pokemon details:', error);
      throw error;
    }
  }

  async importarPokemones() {
    try {
      const mainUrl = `${this.BASE_URL}pokemon?limit=251&offset=0`;
      console.log('URL principal para consultar pokemones:', mainUrl);
      const response = await fetch(mainUrl);
      const jsonData = await response.json();

      const results = await Promise.allSettled(
        jsonData.results.map(async (pokemon: { url: string }) => {
          const detailUrl = `${pokemon.url.endsWith('/') ? pokemon.url.slice(0, -1) : pokemon.url}`;
          console.log('URL detalle pokemon:', detailUrl);
          let detailResponse, detailData;
          try {
            detailResponse = await fetch(detailUrl);
            detailData = await detailResponse.json();
          } catch (err) {
            console.error('Error al consultar detalle:', detailUrl, err);
            return null;
          }

          if (!detailData) return null;

          // Obtener especie para la descripción
          const speciesUrl = `${detailData.species.url.endsWith('/') ? detailData.species.url.slice(0, -1) : detailData.species.url}`;
          console.log('URL especie pokemon:', speciesUrl);
          let speciesResponse, especie;
          try {
            speciesResponse = await fetch(speciesUrl);
            especie = await speciesResponse.json();
          } catch (err) {
            console.error('Error al consultar especie:', speciesUrl, err);
            return null;
          }

          // Procesar stats
          const vida = detailData.stats.find((i: any) => i.stat.name == 'hp')?.base_stat ?? 0;
          const ataque = detailData.stats.find((i: any) => i.stat.name == 'attack')?.base_stat ?? 0;
          const ataqueEspecial = detailData.stats.find((i: any) => i.stat.name == 'special-attack')?.base_stat ?? 0;
          const defensa = detailData.stats.find((i: any) => i.stat.name == 'defense')?.base_stat ?? 0;
          const defensaEspecial = detailData.stats.find((i: any) => i.stat.name == 'special-defense')?.base_stat ?? 0;
          const velocidad = detailData.stats.find((i: any) => i.stat.name == 'speed')?.base_stat ?? 0;

          // Procesar descripción
          let descripcion = especie.flavor_text_entries.find(
            (i: any) => i.version.name == 'omega-ruby' && i.language.name == 'es',
          )?.flavor_text;
          if (!descripcion || descripcion.trim().length == 0) {
            const index = especie.flavor_text_entries.findLastIndex(
              (i: any) => i.language.name == 'es',
            );
            descripcion = especie.flavor_text_entries[index]?.flavor_text ?? '';
          }

          // Procesar imagen
          const imagen =
            detailData.sprites.other?.['official-artwork'].front_default ??
            detailData.sprites.front_default;

          // Retornar objeto listo para guardar
          return {
            ...detailData,
            vida,
            ataque,
            ataqueEspecial,
            defensa,
            defensaEspecial,
            velocidad,
            descripcion,
            imagen,
          };
        })
      );

      // Filtrar solo los que están fulfilled y tienen detalle
      const pokemones = results
        .filter((r): r is PromiseFulfilledResult<any> => r.status === 'fulfilled' && !!r.value)
        .map(r => r.value);

      return pokemones;
    } catch (error) {
      console.error('Error importando pokemones:', error);
      throw error;
    }
  }
  // Guarda los pokemones importados en la base de datos
  async guardarPokemonesEnBD(pokemones: any[]) {
    // 1. Extraer y crear tipos únicos
    const tiposSet = new Set<string>();
    pokemones.forEach(p => {
      if (Array.isArray(p.types)) {
        p.types.forEach((t: any) => tiposSet.add(t.type.name));
      }
    });
    const tipos = Array.from(tiposSet).map(nombre => ({ nombre }));
  await this.prisma.tipoPokemon.createMany({ data: tipos, skipDuplicates: true });

    // 2. Insertar pokemones y relaciones muchos a muchos
    for (const poke of pokemones) {
      // Buscar ids de tipos
      const tiposDb = await this.prisma.tipoPokemon.findMany({
        where: { nombre: { in: poke.types.map((t: any) => t.type.name) } },
      });

      // Crear el pokemon
  const pokemonDb = await this.prisma.pokemon.create({
        data: {
          numero: poke.id,
          nombre: poke.name,
          descripcion: poke.descripcion,
          grunido: poke.cries?.latest ?? '',
          imagen: poke.imagen,
          ataque: poke.ataque,
          defensa: poke.defensa,
          ataque_especial: poke.ataqueEspecial,
          defensa_especial: poke.defensaEspecial,
          velocidad: poke.velocidad,
          altura: poke.height,
          peso: poke.weight,
          sprite: poke.sprites?.front_default ?? '',
          orden: poke.order,
          creadoEn: new Date(),
          actualizadoEn: new Date(),
          tipos: {
            create: tiposDb.map(tipo => ({ tipoPokemon: { connect: { id: tipo.id } } }))
          }
        },
        include: { tipos: true },
      });
    }
    return { ok: true };
  }
  
  async importarYGuardarPokemones() {
    const pokemones = await this.importarPokemones();
    return this.guardarPokemonesEnBD(pokemones);
  }
}

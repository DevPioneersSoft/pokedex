import { Injectable } from '@nestjs/common';
import { ListaPokemon } from './dto/lista_pokemon.interface';
import { ur } from 'zod/v4/locales';
import { PokemonDetalles } from './dto/pokemon-detalles.interface';
import { PokemonSpecies } from './dto/pokemon-espec.interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ImportarPokemonesService {

  private readonly BASE_URL = 'https://pokeapi.co/api/v2/';

  constructor (private prisma: PrismaService){

  }

  async importar() {
    try {
      const resp = await fetch(`${this.BASE_URL}/pokemon?limit=251&offset=0`);
      if (!resp.ok) {
        throw new Error("Ha ocurrido un error al consultar el api");
      }
      const pokemones = (await resp.json()) as ListaPokemon;

      const detalles = await Promise.allSettled( //allSettled devuelve un status
        pokemones.results.map(async ({ url }) => {
          const resp = await fetch(`${url.endsWith("/") ? url.slice(0,-1) : url}`);
          if (!resp.ok) {
            throw new Error("Ha ocurrido un error al consultar el api");
          }

          const pokemon =  (await resp.json()) as PokemonDetalles;

          const {species :{url:speciesUrl}} = pokemon;

          const speciesUrlFixed = speciesUrl.endsWith("/") ? speciesUrl.slice(0,-1) : speciesUrl;

          const speciesApi = await fetch(`${speciesUrlFixed}`);

          if(!speciesApi.ok){
            throw new Error(`Ha ocurrido un error al consulta la especia del pokemon ${pokemon.id}`)
          }

          const especie = (await speciesApi.json()) as PokemonSpecies;

          return {pokemon,especie}


        })
      );

      
      const tipos = new Set(detalles.filter(i => i.status === "fulfilled").flatMap(i=> i.value.pokemon.types).map(i=>({
        nombre: i.type.name
      })));

      await this.prisma.tipo_pokemon.createMany({
        data: [...tipos],
        skipDuplicates: true
      })

      Promise.all(detalles.filter(i=> i.status==="fulfilled").map(({value})=> this.registrarPokemon(value.pokemon,value.especie)))

    } catch (error) {

    }
  }

  async registrarPokemon(pokemon: PokemonDetalles, especie: PokemonSpecies) : Promise<any>{
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
        await this.prisma.pokemon.create({
          data:{
            id:pokemon.id,
            nombre:pokemon.name,
            descripcion,
            grunido: pokemon.cries.latest,
            imagen,
            vida,
            velocidad,
            ataque,
            ataqueEspecial,
            defensa,
            defensaEspecial,
            tipo_pokemon:{
              connectOrCreate: pokemon.types.map((i)=> ({
                where : {nombre:i.type.name},
                create : {nombre:i.type.name}
              }))
            }
          }
        })
      } catch (error) {
        
      }


  }

}

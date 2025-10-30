import { Injectable } from '@nestjs/common';
import { ListaPokemon } from './dto/lista-pokemon.interface';
import { PokemonDetalles, Species } from './dto/pokemon-detalles.interface';
import { PokemonSpecies } from './dto/pokemon.species.interface';


@Injectable()
export class ImportarPokemonesService {
  
  private readonly BASE_URL = 'https://pokeapi.co/api/v2/';

 async importar() {
   try {
    const resp = await  fetch(`${this.BASE_URL}pokemon?limit=251&offset=0`);
    
    if(!resp.ok) throw new Error('Error al obtener los pokemones');

    const pokemones = (await resp.json()) as ListaPokemon;

    // el allSellted nos va permitir ejecutar muchas peticiojnes al mismo tiempo sin importar si falla uno uh otra nos va traer un atributo si se ejecuto bien o no o tro si trae el estatus y el value con el valor del objeto

const detalles = await Promise.allSettled(
  pokemones.results.map(async ({ url }) => {
    //lo ultimo seirve par apor si alguna url de el ciclo termina es slash lo quita esto para hacerlo Homogeneo
  const resp2 = await fetch(`${url.endsWith('/') ? url.slice(0, -1) : url}`);
  if(!resp2.ok) throw new Error(`Error al obtener detalles del pokemon : ${url}`);
  const pokemon = (await resp2.json()) as PokemonDetalles;

  // aqui desestructuramos  pokemon para eso es el primer species entre llaves despues  desetructuramos species sacando url y lo nombramos speciesUrl ya que arriba ya tenem,os un atributo llamado url por eso lo llamamos o renombramos specieUrl
    const {species : {url : speciesUrl}} = pokemon;
    //que es lo mismo a esto 
  //   // Paso 1
  // const { species } = pokemon;
  
  // // Paso 2
  // const { url: speciesUrl } = species;

  const speciesUrlFixes = speciesUrl.endsWith('/') ? speciesUrl.slice(0, -1) : speciesUrl;
  const speciesApi = await fetch(`${speciesUrlFixes}`);
  if(!speciesApi.ok) throw new Error(`Error al obtener la especie del pokemon : ${pokemon.id}`);
  
    const especie = (await speciesApi.json())as PokemonSpecies;
    
    return {pokemon,especie};

})
)

// const tipos = 
detalles.filter(i =>i.status === 'fulfilled').forEach(({value}) => console.log(value.pokemon.id));

    // const pokemones1 :ListaPokemon = (await resp.json()) ;

   } catch (error) {
    
   }
  }

}

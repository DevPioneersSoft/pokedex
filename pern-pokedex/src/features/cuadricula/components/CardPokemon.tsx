import { ActionIcon, Tooltip } from "@mantine/core";
import type { Pokemon } from "../interfaces/Pokemon.interface";
import { IconStar, IconStarFilled } from '@tabler/icons-react';

interface CardPokemonProps {
  pokemon: Pokemon,
  callback?: (pokemon: Pokemon) => void
  esFavorito?: boolean;
  toggleFavoritos?: (pokemon: Pokemon) => void;
  mostrarBtnFavoritos?:boolean
}

export default function CardPokemon({ pokemon, esFavorito = false, toggleFavoritos, mostrarBtnFavoritos, callback }: CardPokemonProps) {

  const { nombre, imagen, id } = pokemon;

  return (
     <div
      key={nombre}
      className="bg-black/50 backdrop-blur-md rounded-lg p-4 flex flex-col items-center" 
      onClick={() => {
        if (callback) callback(pokemon)
      }}
    >
    
      {mostrarBtnFavoritos && (
        <Tooltip
              label={esFavorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
              position="top"
              withArrow
            >
            <ActionIcon
              variant="light"
              color={esFavorito ? 'yellow' : 'gray'}
              onClick={()=>toggleFavoritos?.(pokemon)}
              size="sm"
            >
              {esFavorito ? <IconStarFilled size={15}/> : <IconStar size={15} />}
            </ActionIcon>
        </Tooltip> 
      )}
       
      <h2 style={{
            textAlign: "center",
            color: "white",
            fontWeight: "bold",
            textTransform: "capitalize"
          }}>{nombre}</h2>
      <img src={imagen} alt={nombre} 
      className="max-h-14 2xl:max-h-24" 
        />
        <h3 style={{
            textAlign: "center",
            color: "lightblue",
          }}>{`#${id}`}</h3>
    </div>
  );
}

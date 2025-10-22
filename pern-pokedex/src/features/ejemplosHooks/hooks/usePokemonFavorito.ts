import { useState } from "react";
import type { Pokemon } from "../../layout/components/Pokemon";

export function usePokemonesFavoritos() {
  const [favoritos, setFavoritos] = useState<Pokemon[]>([]);

  const agregarFavorito = (pokemon: Pokemon) => {
    setFavoritos((prev) => {
      if (prev.find((p) => p.id === pokemon.id)) return prev;
      return [...prev, pokemon];
    });
  };

  return {favoritos, agregarFavorito};
}
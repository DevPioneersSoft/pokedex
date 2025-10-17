import { useEffect, useState } from "react";
import type { Pokemon } from "../../../shered/interfaces/Pokemon.interface";

export function useBuscarPokemones() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<{ message: string } | null>(null);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      setCargando(true);
      try {
        const response = await fetch("http://localhost:3000/pokemon");
        const data = await response.json();
        setPokemons(data.data);
      } catch (error) {
        console.error("Error al buscar pokemones:", error);
        setError({ message: "Error al buscar pokemones" });
      } finally {
        setCargando(false);
      }
    }, 300);
    return () => clearTimeout(timeoutId);
  }, []);

  return { pokemons, cargando, error };
}

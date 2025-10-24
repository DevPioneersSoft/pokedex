import { useQuery } from '@tanstack/react-query';
import type { Pokemon } from "../../interfaces/Pokemon.interface";
import { useMemo, useState } from 'react';
import useFavoritos from './useFavoritos';

const apiUrl = import.meta.env.VITE_API_URL;

async function fetchPokemones({ queryKey }: { queryKey: readonly unknown[] }) {
  const [, search, page, pageSize] = queryKey;
  let where: any = undefined;
  if (search) {
    const id = Number(search);
    if (!isNaN(id) && String(id) === String(search)) {
      where = { id };
    } else {
      where = { nombre: { contains: search.toString() } };
    }
  }
  const params = {
    skip: ((Number(page) || 1) - 1) * (Number(pageSize) || 20),
    take: Number(pageSize) || 20,
    where,
  };
  const url = `${apiUrl}/pokemon?` + new URLSearchParams({
    skip: String(params.skip),
    take: String(params.take),
    ...(where ? { where: JSON.stringify(where) } : {}),
    
  });
  const response = await fetch(url);
  const data = await response.json();
  return {
    pokemons: data.data,
    total: data.total,
    pageSize: params.take,
  };
}

export function useBuscarPokemones() {
  const [filtro, setFiltro] = useState('');
  const [pagina, setPagina] = useState(1);
  const [recargando, setRecargando] = useState(false);
  const LIMITE = 15;

  const query = useQuery({
    queryKey: ['pokemones', filtro, pagina, LIMITE],
    queryFn: fetchPokemones,
    staleTime: 1000 * 60 * 5, // 5 minutos para refrescar los pokemones
  });

  const handleBuscar = (texto: string) => {
    setFiltro(texto);
    setPagina(1);
  };

  const handleAnterior = () => {
    setPagina((prev) => Math.max(prev - 1, 1));
  };

  const totalPaginas = Math.ceil((query.data?.total ?? 0) / (query.data?.pageSize ?? LIMITE));

  const handleSiguiente = () => {
    setPagina((prev) => (prev < totalPaginas ? prev + 1 : prev));
  };

  const handleRefrescar = async () => {
    setRecargando(true);
    await query.refetch();
    setRecargando(false);
  };

  const { favoritos } = useFavoritos();

  const pokemonOrdenados = useMemo(() => {
    const pokemons = [...(query.data?.pokemons ?? [])];
    if (!Array.isArray(favoritos) || favoritos.length === 0) {
      return pokemons.sort((a, b) => a.id - b.id);
    }

    const favoritoSet = new Set(favoritos);
    const favoritosOrdenados: Pokemon[] = [];
    const noFavoritos: Pokemon[] = [];

    const byId = new Map(pokemons.map((p) => [p.id, p]));

    for (const favId of favoritos) {
      const p = byId.get(favId);
      if (p) favoritosOrdenados.push(p);
    }

    for (const p of pokemons) {
      if (!favoritoSet.has(p.id)) noFavoritos.push(p);
    }

    noFavoritos.sort((a, b) => a.id - b.id);

    return [...favoritosOrdenados, ...noFavoritos];
  }, [query.data?.pokemons, favoritos]);

  return {
    pokemons: pokemonOrdenados,
    pokemonsList: pokemonOrdenados,
    cargando: query.isLoading,
    isFetching: query.isFetching,
    error: query.error ? { message: query.error.message } : null,
    recargando,
    handleBuscar,
    handleRefrescar,
    handleAnterior,
    handleSiguiente,
    pagina,
    totalPaginas,
  };
}
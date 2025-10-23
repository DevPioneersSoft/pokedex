import api from "../../shared/utils/api";
import { useQuery } from "@tanstack/react-query";
import type { Resoponse } from "../../layout/components/Pokemon";
import { useState, useCallback, useMemo } from "react";

export interface BuscarPokemonParams {
  page?: number;
  pageSize?: number;
  search?: string;
  favoritos: number[];
} 

export function useBuscarPokemon(hooksParams?: BuscarPokemonParams) {

  const [page, setPage] = useState(hooksParams?.page || 1);
  const [pageSize, setPageSize] = useState(hooksParams?.pageSize || 20);
  const [search, setSearch] = useState(hooksParams?.search || '');

  let where = undefined;

  if(search) {
    const id = Number(search);
    if(!isNaN(id) && String(id) === search) {
      where = { id };
    } else {
      where = { nombre: { contains: search.toString() } };
    }
  }

  const params = {
    skip: (page - 1) * pageSize,
    take: pageSize,
    ...(where ? { where: JSON.stringify( where) } : {}),
  };

  const query = useQuery({
    queryKey: ['buscarPokemons', page, pageSize, search],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simula retardo de 1 segundo
      const response = await api.get<Resoponse>('pokemon' , { 
        params,
      });
      return response.data;
    }
  });

  const pokemonOrdenados = useMemo(() => {
    if(!query.data?.data) {
      return query.data;
    }

    if(!hooksParams?.favoritos || hooksParams.favoritos.length === 0) {
      return query.data;
    }

    const pokemonsOrdenados = [...query.data.data].sort((a, b) => {
      const aEsFavorito = hooksParams.favoritos.includes(a.id);
      const bEsFavorito = hooksParams.favoritos.includes(b.id);
      
      if (aEsFavorito && !bEsFavorito) return -1;
      if (!aEsFavorito && bEsFavorito) return 1;
      return 0;
    });

    return {
      ...query.data,
      data: pokemonsOrdenados
    };

  }, [query.data, hooksParams?.favoritos]);

  const nextPage = useCallback(() => {
    if(query.data?.hasNextPage) { 
      setPage((prev) => prev + 1);
    }
  }, [query.data?.hasNextPage]);

  const prevPage = useCallback(() => {
    if(query.data?.hasPreviousPage) {
      setPage((prev) => prev - 1);
    }
  }, [query.data?.hasPreviousPage]);

  const searchPokemon = useCallback((valor: string) => {
    setSearch(valor);
    setPage(1);
  }, []);

  return {
    pokemons: pokemonOrdenados?.data || [],
    cargando: query.isLoading,
    error: query.isError ? (query.error?.message || 'Error al cargar pokemones') : null,
    refrescando: query.isRefetching,
    refetch: query.refetch,
    nextPage,
    prevPage,
    searchPokemon,
    paginaActual: pokemonOrdenados?.page || page,
    totalPaginas: pokemonOrdenados?.totalPages || 0,
    total: pokemonOrdenados?.total || 0,
    hasNextPage: pokemonOrdenados?.hasNextPage || false,
    hasPreviousPage: pokemonOrdenados?.hasPreviousPage || false,
  };
}

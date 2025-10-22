import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { ResponsePokemons } from "../interfaces/Pokemon.interface";
import api from "../../../shered/utils/api";

export interface UseBuscarPokemonesParams {
  initialPage?: number;
  initialPageSize?: number;
  initialSearch?: string;
  favoritos: number[]
}

export function useBuscarPokemones({initialPage, initialPageSize,initialSearch,favoritos = []}: UseBuscarPokemonesParams) {
  const [page, setPage] = useState(initialPage ?? 1);
  const [pageSize] = useState(initialPageSize ?? 20);
  const [search, setSearch] = useState(initialSearch ?? "");

  let where = undefined;

  if (search) {
    const id = Number(search);
    if (!isNaN(id) && String(id) === String(search)) {
      where = { id };
    } else {
      where = { nombre: { contains: search.toString() } };
    }
  }

  const params = {
    skip: (page - 1) * pageSize,
    take: pageSize,
    ...(where ? { where: JSON.stringify(where) } : {}),
  };

  const query = useQuery({
    queryKey: ["buscarPokemones", params,favoritos],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const response = await api.get<ResponsePokemons>("pokemon", {
        params,
      });
      return response.data;
    },
  });

  const pokemonsOrdenados = useMemo(() => {
    if (!query.data?.data)
      return []
    return query.data.data.sort((a, b) => {
      const aFav = favoritos?.includes(a.id);
      const bFav = favoritos?.includes(b.id);

      if (aFav && !bFav) return -1;
      if (!aFav && bFav) return 1;
      return 0;
    });
  }, [query.data?.data, favoritos]); 


  const nextPage = () => {
    if (query.data?.hasNextPage) {
      setPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (query.data?.hasPreviousPage) {
      setPage((prev) => prev - 1);
    }
  };

  const searchPokemons = (searchText: string) => {
    setSearch(searchText);
    setPage(1);
  };

  return {
    pokemones: pokemonsOrdenados,
    isLoading: query.isLoading,
    refetch: query.refetch,
    isFetching: query.isFetching,
    nextPage,
    prevPage,
    searchPokemons,
    page,
    totalPages: query.data?.totalPages || 0,
    hasNextPage: query.data?.hasNextPage || false,
    hasPrevPage: query.data?.hasPreviousPage || false,
  };
}

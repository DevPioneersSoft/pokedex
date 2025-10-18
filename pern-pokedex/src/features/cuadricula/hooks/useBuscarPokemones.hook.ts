import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { ResponsePokemons } from "../interfaces/Pokemon.interface";
import api from "../../../shered/utils/api";

export interface UseBuscarPokemonesParams {
  initialPage?: number;
  initialPageSize?: number;
  initialSearch?: string;
}

export function useBuscarPokemones(hookParams?: UseBuscarPokemonesParams) {
  const [page, setPage] = useState(hookParams?.initialPage ?? 1);
  const [pageSize] = useState(hookParams?.initialPageSize ?? 20);
  const [search, setSearch] = useState(hookParams?.initialSearch ?? "");

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
    queryKey: ["buscarPokemones", params],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const response = await api.get<ResponsePokemons>("pokemon", {
        params,
      });
      console.log(response.data);
      return response.data;
    },
  });

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
    pokemones: query.data?.data,
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

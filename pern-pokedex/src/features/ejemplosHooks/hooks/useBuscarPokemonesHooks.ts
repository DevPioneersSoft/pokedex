import { useEffect, useState } from "react";
import type { Pokemon } from "../../interfaces/Pokemon.interface";
import type { ResponsePokemons } from "../../interfaces/Pokemon.interface";
import { useQuery } from "@tanstack/react-query";
import api from "../../../shared/utils/api";

export interface UseBuscarPokemonesParams {
  initialPage?:number;
  initialPageSize?: number;
  initialSearch?: string;
}

export function useBuscarPokemones(hookParams?: UseBuscarPokemonesParams) {
  const [page, setPage] = useState(hookParams?.initialPage ?? 1);
  const [pageSize, setPageSize] = useState(hookParams?.initialPageSize ?? 20);
  const [search, setSearch] = useState(hookParams?.initialSearch ?? "");

  let where = undefined;

  if(search){
    const id = Number(search);
    if(!isNaN(id) && String(id) === String(search)){
      where = {id};
    }else{
      where = {nombre: {contains: search.toString()}}
    }
  }
  
  const params = {
    skip: (page - 1) * pageSize,
    take: pageSize,
      ...(where ? {where: JSON.stringify(where)} : {})
  }
  const query = useQuery<ResponsePokemons>({
    queryKey: ["buscarPokemonms", params],
    queryFn: async () => {
      await new Promise((resolve)=> setTimeout(resolve, 300));
      const resp = await api.get<ResponsePokemons>("pokemon", {
        params,
      });
      return resp.data;
    }
  })

  const nextPage = () => {
    if(query.data?.hasNextPage){
    // if(page < (query.data?.totalPages ?? 1)){
      setPage((prev) => prev + 1);

    }
  }
  const prevPage = () => {
    if(query.data?.hasPreviousPage){
      setPage((prev) => prev - 1);

    }
  }

  const searchPokemons = (searchText : string) => {
    setSearch(searchText);
    // setPage(1);
  }

  // return { pokemons, cargando, error };
  return { 
    pokemones: query.data?.data, 
    isLoading: query.isLoading, 
    refetch: query.refetch, 
    isFetching: query.isFetching,
    nextPage,
    prevPage,
    searchPokemons,
  };
  }
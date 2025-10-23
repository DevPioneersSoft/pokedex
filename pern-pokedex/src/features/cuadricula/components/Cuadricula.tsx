import { Button, Container, Group, SimpleGrid, TextInput } from "@mantine/core";
import { useBuscarPokemones } from "../hooks/useBuscarPokemones.hook";
import type { Pokemon } from "../interfaces/Pokemon.interface";
import CardPokemon from "./CardPokemon";
import { useState } from "react";
import useFavoritos from "../hooks/useFavoritos";
import { usePokemonesFavoritos } from "../../ejemplosHooks/hooks";

interface CuadriculaProps {
  callback?: (pokemon: Pokemon) => void
}

export default function Cuadricula({ callback }: CuadriculaProps) {
  
  const {favoritos} = useFavoritos();
  
  const {
    pokemones,
    isLoading,
    refetch,
    isFetching,
    prevPage,
    nextPage,
    hasPrevPage,
    hasNextPage,
    page,
    totalPages,
    searchPokemons,
  } = useBuscarPokemones({ initialPage: 1, initialPageSize: 30 , favoritos});
  const [searchTerm, setSearchTerm] = useState('');
  if (isLoading) return <div>Cargando...</div>;
  if (isFetching) return <div>Refrescando...</div>;
  return (
    <>
      
    <Container size="xl" py="lg">
      <Group mb="xl" justify="space-between" gap="md">
        <Button color="gray" onClick={() => refetch()}>Refrescar</Button>
        
        <TextInput
            placeholder="Buscar por ID o nombre..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.currentTarget.value)}
            style={{ flexGrow: 1 }}
        />
        <Button 
            color="green"
            onClick={() => searchPokemons(searchTerm)} 
        >
            Buscar
        </Button>
      </Group>

      <SimpleGrid cols={{ base: 2, sm: 4, lg: 4 }} style={{ 
          gap: '20px' 
      }} >
        {pokemones?.map((pokemon, index) => (
          <CardPokemon
            key={index}
            pokemon = {pokemon}
            callback={callback}
          />
        ))}
      </SimpleGrid>
      <Group justify="center" gap="md" mb="xl" mt={30}> 
         <Button  color="black" onClick={() => prevPage()} disabled={!hasPrevPage}>Anterior</Button>
          <span>
            Página {page} de {totalPages}
          </span>
          <Button color="black" onClick={() => nextPage()} disabled={!hasNextPage}>Siguiente</Button>
      </Group>
    </Container>
    </>
  );
}

import { Button, Center, Container, Group, Loader, SimpleGrid, Stack, TextInput } from "@mantine/core";
import { useBuscarPokemones } from "../hooks/useBuscarPokemones.hook";
import type { Pokemon } from "../interfaces/Pokemon.interface";
import CardPokemon from "./CardPokemon";
import { useState } from "react";
import useFavoritos from "../hooks/useFavoritos";

interface CuadriculaProps {
  callback?: (pokemon: Pokemon) => void,
}

export default function Cuadricula({ callback }: CuadriculaProps) {
  
  const {favoritos, toggleFavoritos} = useFavoritos();
  
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
  
  if(isLoading) {
    return <Center style={{ minHeight: '80vh' }}>
      <Stack align="center" gap="sm">
        <Loader size="xl" />
        <p style={{ margin: 0, fontSize: '1.2rem', color: '#888' }}>
          Cargando...
        </p>
        </Stack>
      </Center>
  }
  if(isFetching) {
    return <Center style={{ minHeight: '80vh' }}>
      <Stack align="center" gap="sm">
        <Loader size="xl" />
        <p style={{ margin: 0, fontSize: '1.2rem', color: '#888' }}>
          Cargando...
        </p>
        </Stack>
      </Center>
  }
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
            esFavorito={favoritos.includes(pokemon.id)}
            toggleFavoritos={toggleFavoritos}
            mostrarBtnFavoritos={true}
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

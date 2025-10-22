import { Container, Grid, Button, Group, Title, TextInput, Stack, Text, Loader } from '@mantine/core'
import { useState, useEffect } from 'react';
import { useDebouncedValue } from '@mantine/hooks';
import CardPokemon from './CardPokemon';
import { useBuscarPokemon } from '../../ejemplosHooks/hooks/useBuscarPokemon';
import useFavoritos from '../../pokemonDetalle/componentes/hooks/useFavoritos';

export default function Cuadricula() {

  const [busqueda, setBusqueda] = useState('');
  const [debouncedBusqueda] = useDebouncedValue(busqueda, 500); // Espera 500ms después de que el usuario deje de escribir
  const {favoritos, toggleFavorito} = useFavoritos();
  const { pokemons, cargando, error, refrescando, refetch, nextPage, prevPage, searchPokemon, paginaActual, totalPaginas, hasNextPage, hasPreviousPage } = useBuscarPokemon({ favoritos });

  useEffect(() => {
    searchPokemon(debouncedBusqueda);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedBusqueda]);

  if (cargando || refrescando) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}>
        <Loader color="white" size="lg" />
      </div>
    );
  }

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <Group gap="md" wrap="nowrap">
          <Title order={2} style={{ flexShrink: 0 }}>Pokédex</Title>
          <TextInput
            placeholder="Buscar Pokémon..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.currentTarget.value)}
            size="md"
            style={{ flex: 1 }}
          />
          <Group gap="xs" style={{ flexShrink: 0 }}>
            <Button 
              onClick={prevPage}
              disabled={!hasPreviousPage}
            >
              ← Anterior
            </Button>
            <Text size="sm" fw={500} c="white" style={{ whiteSpace: 'nowrap' }}>
              {paginaActual} de {totalPaginas}
            </Text>
            <Button 
              onClick={nextPage}
              disabled={!hasNextPage}
            >
              Siguiente →
            </Button>
            <Button 
              onClick={() => refetch()} 
              loading={refrescando}
            >
              Refrescar
            </Button>
          </Group>
        </Group>
        
        {error && (
          <div style={{ color: 'red' }}>
            Error: {error}
          </div>
        )}

        <Grid gutter="lg">
          {pokemons.map((pokemon) => (
            <CardPokemon 
              key={pokemon.id} 
              pokemon={pokemon}
              esFavorito={favoritos.includes(pokemon.id)}
              onToggleFavorito={toggleFavorito}
            />
          ))}
        </Grid>

      </Stack>
    </Container>
  );
}
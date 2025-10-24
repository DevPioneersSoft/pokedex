import { Container, Grid, Button, Group, Title, TextInput, Stack, Text, Loader } from '@mantine/core'
import { useState, useEffect } from 'react';
import { useDebouncedValue } from '@mantine/hooks';
import CardPokemon from './CardPokemon';
import CardPokemonEquipo from './CardPokemonEquipo';
import { useBuscarPokemon } from '../../ejemplosHooks/hooks/useBuscarPokemon';
import useFavoritos from '../../pokemonDetalle/componentes/hooks/useFavoritos';
import type { Pokemon } from '../../layout/components/Pokemon';
import useEquipoRegistrar from '../../pokemonDetalle/componentes/hooks/useEquipoRegistrar';
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import useEquipoUsuario from '../../pokemonDetalle/componentes/hooks/useEquipoUsuario';
import { useUserStore } from '../../layout/store/userStore';

export default function CuadriculaEquipo() {

  const [busqueda, setBusqueda] = useState('');
  const [debouncedBusqueda] = useDebouncedValue(busqueda, 500); // Espera 500ms después de que el usuario deje de escribir
  const [pokemonSeleccionados, setPokemonSeleccionados] = useState<Pokemon[]>([]);
  const {favoritos, toggleFavorito} = useFavoritos();
  const { pokemons, cargando, error, refrescando, refetch, nextPage, prevPage, searchPokemon, paginaActual, totalPaginas, hasNextPage, hasPreviousPage } = useBuscarPokemon({ favoritos });
  const equipoMutation = useEquipoRegistrar();
  const equipoUsuario = useEquipoUsuario();
  const setEquipoPokemon = useUserStore(state => state.setEquipoPokemon);

  useEffect(() => {
    equipoUsuario.mutate(undefined, {
      onSuccess: (data) => {
        setPokemonSeleccionados(data);
        setEquipoPokemon(data);
      }
    });
  }, []);

  useEffect(() => {
    setEquipoPokemon(pokemonSeleccionados);
  }, [pokemonSeleccionados, setEquipoPokemon]);

  const agregarALista = (pokemon: Pokemon) => {
    setPokemonSeleccionados(prev => {
      const yaExiste = prev.find(p => p.id === pokemon.id);
      if (yaExiste) {
        return prev.filter(p => p.id !== pokemon.id);
      } else {
        if(prev.length >= 6) return prev;
        return [...prev, pokemon];
      }
    });
  };

  const enviarEquipo = () => {
    if (pokemonSeleccionados.length === 0) {
      alert('Selecciona al menos un Pokémon para tu equipo');
      return;
    }

    const equipoIds = pokemonSeleccionados.map(pokemon => pokemon.id);
    
    equipoMutation.mutate(equipoIds, {
      onSuccess: (data) => {
        alert('¡Equipo guardado exitosamente!');
        console.log('Respuesta del servidor:', data);
      },
      onError: (error) => {
        console.error('Error al guardar el equipo:', error);
        alert('Error al guardar el equipo. Inténtalo de nuevo.');
      }
    });
  };

  const removerDeLista = (pokemonId: number) => {
    setPokemonSeleccionados(prev => prev.filter(p => p.id !== pokemonId));
  };

  const limpiarLista = () => {
    setPokemonSeleccionados([]);
  };

  useEffect(() => {
    searchPokemon(debouncedBusqueda);
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

  //Draggable functions
  const reorder = (list: Pokemon[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const grid = 1;

  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    background: isDragging ? "rgba(100, 200, 100, 0.3)" : "transparent",
    borderRadius: isDragging ? "8px" : "0",
    boxShadow: isDragging ? "0 4px 12px rgba(0, 0, 0, 0.3)" : "none",

    ...draggableStyle
  });

  const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? "rgba(100, 150, 255, 0.2)" : "transparent",
    padding: grid,
    width: "100%"
  });
  

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      pokemonSeleccionados,
      result.source.index,
      result.destination.index
    );

    setPokemonSeleccionados(items);
  }

  return (
    
    <Container size="xl" py="xl">
      <Grid gutter="xl">
        
        <Grid.Col span={8}>
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
            </Group>

            <Group gap="xs" justify="center">
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
                  callback={agregarALista}
                />
              ))}
            </Grid>
          </Stack>
        </Grid.Col>

        <Grid.Col span={4}>
          <Stack gap="md" style={{ 
            height: '100%', 
            backgroundColor: 'rgba(255, 255, 255, 0.05)', 
            borderRadius: '8px',
            padding: '1rem',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <Group justify="space-between">
              <Title order={3} c="white">Equipo Seleccionado</Title>
              {pokemonSeleccionados.length > 0 && (
                <Button size="xs" variant="subtle" color="primary" onClick={limpiarLista}>
                  Limpiar Lista
                </Button>
              )}
            </Group>
            
            {pokemonSeleccionados.length === 0 ? (
              <Text size="sm" c="white" ta="center" style={{ marginTop: '2rem' }}>
                Haz clic en un Pokémon para agregarlo a tu equipo
              </Text>
            ) : (
              <Stack gap="sm" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                      >
                        {pokemonSeleccionados.map((pokemon, index) => (
                          <Draggable key={pokemon.id} draggableId={pokemon.id.toString()} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                  snapshot.isDragging,
                                  provided.draggableProps.style
                                )}
                              >
                                <CardPokemonEquipo 
                                  key={pokemon.id} 
                                  pokemon={pokemon}
                                  onRemover={removerDeLista}
                                />
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </Stack>
            )}
            
            {pokemonSeleccionados.length > 0 && (
              <Stack gap="sm">
                <Text size="sm" c="white" ta="center">
                  {pokemonSeleccionados.length} Pokémon en tu equipo
                </Text>
                <Button 
                  fullWidth
                  onClick={enviarEquipo}
                  loading={equipoMutation.isPending}
                  disabled={pokemonSeleccionados.length === 0}
                >
                  Guardar Equipo
                </Button>
              </Stack>
            )}
            
          </Stack>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
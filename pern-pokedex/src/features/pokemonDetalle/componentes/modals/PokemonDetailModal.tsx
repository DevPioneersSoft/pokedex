import { Modal, Image, Text, Badge, Stack, Group, Title, Loader, Center, Button, ActionIcon } from '@mantine/core';
import type { DetallePokemon } from '../types/detallePokemon.interface';
import { BarraStats } from '../BarraStats';
import { usePokemonFile } from '../../../ejemplosHooks/hooks/usePokemonFile';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';

interface PokemonDetailModalProps {
  opened: boolean;
  onClose: () => void;
  pokemon: DetallePokemon | null | undefined;
  loading?: boolean;
}

function getTipoColor(tipo: string): string {
  const tipoLower = tipo.toLowerCase();
  const colores: Record<string, string> = {
    normal: 'gray',
    fire: 'orange',
    water: 'blue',
    grass: 'green',
    electric: 'yellow',
    ice: 'cyan',
    fighting: 'red',
    poison: 'grape',
    ground: 'orange',
    flying: 'indigo',
    psychic: 'pink',
    bug: 'lime',
    rock: 'gray',
    ghost: 'violet',
    dragon: 'indigo',
    dark: 'dark',
    steel: 'gray',
    fairy: 'pink',
    stellar: 'grape',
  };
  return colores[tipoLower] || 'gray';
}

export function PokemonDetailModal({ opened, onClose, pokemon, loading = false }: PokemonDetailModalProps) {
  
  const pokemonFileQuery = usePokemonFile(pokemon?.id || 0);

  const handleDescargar = () => {
    if (pokemon?.id) {
      pokemonFileQuery.refetch();
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={pokemon?.nombre ? `#${pokemon.id.toString().padStart(3, '0')} ${pokemon.nombre}` : ''}
      size="lg"
      centered
    >
      {loading ? (
        <Center p="xl">
          <Loader color="blue" size="lg" />
        </Center>
      ) : pokemon ? (
        <Stack gap="md">
          
          <div style={{ 
            backgroundColor: '#F2F2F2', 
            padding: '2rem', 
            borderRadius: '8px', 
            textAlign: 'center' 
          }}>
            <Image 
              src={pokemon.imagen} 
              alt={pokemon.nombre} 
              fit="contain" 
              h={200} 
              mx="auto"
            />
          </div>
          
          <Group justify="space-between">
            <Title order={3} tt="capitalize">{pokemon.nombre}</Title>
            <Group gap="sm">
              <Badge color="blue" variant="light" size="lg">
                #{pokemon.id.toString().padStart(3, '0')}
              </Badge>
              <Button
                variant="light"
                color="green"
                size="sm"
                onClick={handleDescargar}
                loading={pokemonFileQuery.isLoading}
              >
                📄 Descargar Ficha
              </Button>
            </Group>
          </Group>

          {pokemon.descripcion && (
            <Text size="sm" c="dimmed">
              {pokemon.descripcion}
            </Text>
          )}

          <Title order={4}>Estadísticas</Title>
          <Stack gap="md">
            <BarraStats 
              label="Vida" 
              value={pokemon.vida} 
              maxValue={200} 
              color="red" 
            />
            <BarraStats 
              label="Ataque" 
              value={pokemon.ataque} 
              maxValue={200} 
              color="orange" 
            />
            <BarraStats 
              label="Defensa" 
              value={pokemon.defensa} 
              maxValue={200} 
              color="blue" 
            />
            <BarraStats 
              label="Velocidad" 
              value={pokemon.velocidad} 
              maxValue={200} 
              color="green" 
            />
            <BarraStats 
              label="Ataque Especial" 
              value={pokemon.ataqueEspecial} 
              maxValue={200} 
              color="purple" 
            />
            <BarraStats 
              label="Defensa Especial" 
              value={pokemon.defensaEspecial} 
              maxValue={200} 
              color="cyan" 
            />
          </Stack>

          {pokemon.tipoPokemon && pokemon.tipoPokemon.length > 0 && (
            <>
              <Title order={4}>Tipos</Title>
              <Group gap="xs">
                {pokemon.tipoPokemon.map((tipo) => (
                  <Badge 
                    key={tipo.id} 
                    variant="filled" 
                    color={getTipoColor(tipo.nombre)} 
                    size="md"
                    tt="capitalize"
                  >
                    {tipo.nombre}
                  </Badge>
                ))}
              </Group>
            </>
          )}

        </Stack>
      ) : (
        <Text c="dimmed" ta="center" p="xl">
          No se pudo cargar la información del Pokémon
        </Text>
      )}
    </Modal>
  );
}
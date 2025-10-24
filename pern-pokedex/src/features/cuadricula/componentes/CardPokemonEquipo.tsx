import { Card, Group, Image, Stack, Text, Badge, ActionIcon } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import type { Pokemon } from '../../layout/components/Pokemon';

interface CardPokemonEquipoProps {
  pokemon: Pokemon;
  onRemover: (pokemonId: number) => void;
}

export default function CardPokemonEquipo({ pokemon, onRemover }: CardPokemonEquipoProps) {
  return (
    <Card padding="sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
      <Group gap="sm">
        <Image 
          src={pokemon.imagen} 
          alt={pokemon.nombre} 
          w={50} 
          h={50} 
          fit="contain"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '4px' }}
        />
        <Stack gap={2} style={{ flex: 1 }}>
          <Text fw={600} c="white" tt="capitalize">
            {pokemon.nombre}
          </Text>
          <Badge size="xs" color="white" variant="light">
            #{pokemon.id.toString().padStart(3, '0')}
          </Badge>
        </Stack>
        <ActionIcon
          variant="subtle"
          color="red"
          size="sm"
          onClick={() => onRemover(pokemon.id)}
        >
          <IconX size={16} />
        </ActionIcon>
      </Group>
    </Card>
  );
}

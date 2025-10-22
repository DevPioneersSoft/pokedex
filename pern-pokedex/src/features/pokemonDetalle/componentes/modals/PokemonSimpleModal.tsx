import { Modal, Image, Stack, Group, Title, Badge, Button, ActionIcon } from '@mantine/core';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import type { Pokemon } from '../../../layout/components/Pokemon';

interface PokemonSimpleModalProps {
  opened: boolean;
  onClose: () => void;
  pokemon: Pokemon | null;
  onViewDetail: (pokemon: Pokemon) => void;
}

export function PokemonSimpleModal({ 
  opened, 
  onClose, 
  pokemon, 
  onViewDetail,
}: PokemonSimpleModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title=""
      size="sm"
      centered
    >
      {pokemon && (
        <Stack gap="md" align="center">
          <div style={{ 
            backgroundColor: '#F2F2F2', 
            padding: '1.5rem', 
            borderRadius: '8px', 
            textAlign: 'center', 
            width: '100%' 
          }}>
            <Image 
              src={pokemon.imagen} 
              alt={pokemon.nombre} 
              fit="contain" 
              h={150} 
              mx="auto"
            />
          </div>

          <Group gap="sm" justify="space-between" w="100%">
            <Group gap="sm">
              <Badge color="blue" variant="light" size="lg">
                #{pokemon.id.toString().padStart(3, '0')}
              </Badge>
              <Title order={3} tt="capitalize">{pokemon.nombre}</Title>
            </Group>
          </Group>

          <Button 
            onClick={() => onViewDetail(pokemon)}
            fullWidth
            variant="filled"
          >
            Ver Detalle Completo
          </Button>
        </Stack>
      )}
    </Modal>
  );
}
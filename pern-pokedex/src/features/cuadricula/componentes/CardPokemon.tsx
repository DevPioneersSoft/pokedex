import { Card, Grid, Image, Text, Badge, Group, ActionIcon } from '@mantine/core'
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { styleCard } from '../../layout/types/Color';
import type { Pokemon } from '../../layout/components/Pokemon';
import { usePokemonModal } from '../../../context/PokemonModalContext';

interface CardPokemonProps {
  pokemon: Pokemon;
  callback?: (pokemon: Pokemon) => void;
  esFavorito?: boolean;
  onToggleFavorito?: (pokemon: Pokemon) => void;
}

export default function CardPokemon({ pokemon, esFavorito = false, onToggleFavorito }: CardPokemonProps) {
  const { openModal } = usePokemonModal();
  const { id, nombre, imagen } = pokemon;
  const styleSpan = { xs: 6, sm: 4, md: 3 };

  const handleClick = () => {
    openModal(pokemon);
  };

  const handleFavoritoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorito?.(pokemon);
  };

  return (
    <Grid.Col key={id} span={styleSpan}>
        <Card onClick={handleClick} style={{ cursor: 'pointer' }}>
            <Card.Section style={{ ...styleCard, backgroundColor: '#F2F2F2' }} >
                <Image src={imagen} alt={nombre} fit="contain" h={160} />
            </Card.Section>

            <Card.Section p="md">
                <Group justify="space-between" mb="xs">
                  <Badge color="blue" variant="light" size="lg">
                    #{id.toString().padStart(3, '0')}
                  </Badge>
                  <ActionIcon
                    variant="subtle"
                    color={esFavorito ? 'red' : 'gray'}
                    onClick={handleFavoritoClick}
                    size="sm"
                  >
                    {esFavorito ? <IconHeartFilled size={18} /> : <IconHeart size={18} />}
                  </ActionIcon>
                </Group>
                <Text fw={700} size="lg" tt="capitalize" c="dark">
                  {nombre}
                </Text>
            </Card.Section>
        </Card>
    </Grid.Col>
  )
}

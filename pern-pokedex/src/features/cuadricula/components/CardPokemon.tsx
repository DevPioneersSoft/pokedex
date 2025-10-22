import { Card, Center, Image, Text } from "@mantine/core";
import type { Pokemon } from "../interfaces/Pokemon.interface";

interface CardPokemonProps {
  pokemon: Pokemon,
  callback?: (pokemon: Pokemon) => void
}

export default function CardPokemon({ pokemon, callback }: CardPokemonProps) {

  const { nombre, imagen } = pokemon

  return (
    <div
      key={nombre}
      className="backdrop-blur-md rounded-lg flex flex-col items-center"
      onClick={() => {
        if (callback) callback(pokemon)
      }}
    >
      <Card shadow="sm"  radius="md" withBorder className="m-3 inline-block bg-white" style={{ cursor: 'pointer' }}>
        <Card.Section>
          <Center className="bg-gray-300">
            <Text size="xl" fw={700} >{nombre}</Text>
          </Center> 
        </Card.Section>
        <Card.Section>
          <Image src={imagen} alt={nombre}/>
        </Card.Section>
      </Card>
    </div>
  );
}

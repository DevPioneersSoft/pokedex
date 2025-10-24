import { Badge, Card, Center, Image, Text } from '@mantine/core';
import { Pokemon } from '../interfaces/Pokemon.interface';

interface CardPokemonProps {
    pokemon: Pokemon
    callback?: (pokemon: Pokemon) => void
    selected: boolean
}
export default function CardPokemon({ pokemon, callback, selected }: CardPokemonProps) {

    const { nombre, imagen, id } = pokemon
    return (
        <Card shadow="md" radius="xl"
            onClick={() => callback?.(pokemon)}
            className={`
                transition-all duration-300 cursor-pointer
                ${selected
                    ? "bg-gradient-to-b from-yellow-400 to-yellow-200"
                    : "bg-gradient-to-b from-blue-300 to-blue-200"
                }
            `}
        >
            <Card.Section>
                <Image src={imagen} alt={nombre} />
            </Card.Section>

            <Card.Section className="px-2">
                <Badge variant="default">#{id.toString().padStart(3, "0")}</Badge>
            </Card.Section>

            <Card.Section>
                <Center className='p-2 mt-2 rounded-b-xl'>
                    <Text fw={500}>{nombre.toUpperCase()}</Text>
                </Center>
            </Card.Section>
        </Card>
    )
}

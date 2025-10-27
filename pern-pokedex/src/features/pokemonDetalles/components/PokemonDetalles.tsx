import { Flex, Grid, Group, Image, Progress, Space, Stack, Text } from "@mantine/core";

import ButtonCustom from "../../layout/components/ButtonCustom";
import PokemonTypes from "./PokemonTypes";
import type { PokemonDetalle } from "../types/detallePokemon.interface";
import { usePokemonFile } from "../hooks/usePokemonFile";


interface PokemonDetallesProps {
    pokemon: PokemonDetalle;
}

const MAX_STAT_VALUE = 255;

export default function PokemonDetalles({ pokemon }: PokemonDetallesProps) {
    const {
        imagen,
        id,
        grunido,
        nombre,
        descripcion,
        tipoPokemon,
        ...stats
    } = pokemon

    const { refetch, isFetching } = usePokemonFile(pokemon.id)


    function formatearNombre(nombre: string) {
        const nombresLegibles: Record<string, string> = {
            vida: 'Vida',
            ataque: 'Ataque',
            defensa: 'Defensa',
            ataqueEspecial: 'Ataque Especial',
            defensaEspecial: 'Defensa Especial',
            velocidad: 'Velocidad',
        };
        return nombresLegibles[nombre] || nombre;
    }

    return (
        <>
            <Grid>
                <Grid.Col span={6}>
                    <Flex justify={'center'} align={'center'} gap={20}>
                        <Image src="/pokeball.svg" alt="Pokeball" h={60} w={60} />
                        <Text size="4rem" fw={700} className="uppercase font-bold">{nombre}</Text>
                    </Flex>

                    <Flex justify={'center'}>
                        <Text size="2rem" fw={500}> #{String(id).padStart(3, "0")}</Text>
                    </Flex>
                    <Space h={'xl'} />
                    <Flex justify={'center'}>
                        <Image h={450} w="auto" src={imagen} />
                    </Flex>
                    <Space h={'xs'} />
                    <Flex justify={'center'}>
                        <PokemonTypes types={tipoPokemon.map(tipo => tipo.nombre)} />
                    </Flex>
                </Grid.Col>
                <Grid.Col span={6}>

                    <Group justify="space-between">
                        <ButtonCustom label="Descargar" color="primary" isLoading={isFetching} onClick={() => refetch()} />
                    </Group>

                    <Space h={'md'} />

                    <Stack>
                        {Object.entries(stats).map(([key, value]) => (
                            <div key={key}>
                                <Text size="sm" fw={500} mb={4}>
                                    {formatearNombre(key)}: {value}
                                </Text>
                                <Progress value={(value / MAX_STAT_VALUE) * 100} />
                            </div>
                        ))}
                    </Stack>

                    <Space h={30} />

                    <Flex justify={'center'}>
                        <Text fs={'italic'} size="xl">{descripcion}</Text>
                    </Flex>
                </Grid.Col>

            </Grid>

        </>
    )
}

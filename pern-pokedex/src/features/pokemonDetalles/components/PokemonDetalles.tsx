import { Flex, Grid, Group, Image, Progress, Space, Stack, Text, type ProgressProps } from "@mantine/core";

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

    const colorPorCaracteristica = (tipo : string) =>{
        switch (tipo) {
            case 'vida':
            return "red";
        
            case 'ataque':
            return "cyan";

            case 'defensa':
            return "orange";

            case 'ataqueEspecial':
            return "green";

            case 'defensaEspecial':
            return "purple";

            case 'velocidad':
            return "yellow";

            default:
            return "black";
        }
    }

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
                    <Flex justify={'center'}>
                        <Image src="/pokeball.svg" alt="Pokeball" h={30} w={30} /> 
                        <Text size="2rem" fw={800}> &nbsp; {String(id).padStart(3, "0")}</Text>
                    </Flex>
                    <Flex justify={'center'}>
                        <Image h={450} w="auto" src={imagen} />
                    </Flex>
                    <Space h={'xs'} />
                     <Flex justify={'center'} align={'center'} gap={20}>
                        <Text size="4rem" fw={700}>{nombre}</Text>
                    </Flex>
                    <Space h={'xl'} />
                    <Flex justify={'center'}>
                        <PokemonTypes types={tipoPokemon.map(tipo => tipo.nombre)} />
                    </Flex>
                    
                </Grid.Col>
                
                <Grid.Col span={6}>
                     <Flex justify={'center'}>
                        <Text fw={'bold'} size="xl">{descripcion}</Text>
                    </Flex>

                    <Space h={30} />

                    <Stack>
                        {Object.entries(stats).map(([key, value]) => (
                            <div key={key}>
                                <Text size="sm" fw={500} mb={3}>
                                    {formatearNombre(key)}
                                </Text>
                                <Progress value={(value / MAX_STAT_VALUE) * 100} color={colorPorCaracteristica(key)} />
                                <Text size="md" fw={300} ml={5}>{value}</Text>
                            </div>
                        ))}
                    </Stack>
                    
                    <Space h={30} />

                    <Group justify="space-between" ml={'35%'}>
                        <Flex justify={'center'}>
                            <ButtonCustom label="Descargar" color="warning" isLoading={isFetching} onClick={() => refetch()} style={{ cursor: 'pointer' }} />
                        </Flex>
                    </Group>

                </Grid.Col>

            </Grid>

        </>
    )
}

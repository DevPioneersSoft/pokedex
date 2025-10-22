import { Flex, Grid, Group, Image, Space, Text } from "@mantine/core";
import ButtonCustom from "../layout/components/ButtonCustom";
import PokemonTypes from "./PokemonTypes";
import type { PokemonDetalle } from "./types/detallePokemon.interface";
import { usePokemonFile } from "./hooks/usePokemonFile";

interface PokemonDetallesProps {
    pokemon: PokemonDetalle;
}

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

    // Barra de estadísticas estilo retro
    const StatBar = ({ value, max = 255, color }: { value: number; max?: number; color: string }) => (
        <div className="w-full bg-gray-300 rounded-full h-4 border-2 border-gray-600 overflow-hidden">
            <div 
                className={`h-full rounded-full ${color} border-r-2 border-gray-600`}
                style={{ width: `${(value / max) * 100}%` }}
            />
        </div>
    );

    // Colores por tipo de estadística
    const statColors: { [key: string]: string } = {
        vida: 'bg-red-500',
        ataque: 'bg-orange-500',
        defensa: 'bg-green-500',
        ataqueEspecial: 'bg-yellow-500',
        defensaEspecial: 'bg-purple-500',
        velocidad: 'bg-blue-500',
    };

    function formatearNombre(nombre: string) {
        const nombresLegibles: Record<string, string> = {
            vida: 'HP',
            ataque: 'ATK',
            defensa: 'DEF',
            ataqueEspecial: 'SP.ATK',
            defensaEspecial: 'SP.DEF',
            velocidad: 'SPD',
        };
        return nombresLegibles[nombre] || nombre;
    }

    return (
        <>
            <Grid>
                <Grid.Col span={6}>
                    <Flex justify={'center'} align={'center'} gap={20}>
                        <Image src="/pokeball.svg" alt="Pokeball" h={60} w={60} />
                        <Text size="4rem" fw={700}>{nombre}</Text>
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

                    {/* Estadísticas con barras estilo retro */}
                    <div className="space-y-4">
                        {Object.entries(stats).map(([key, value]) => (
                            <div key={key} className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <Text size="md" fw={700} className={`${
                                        key === 'vida' ? 'text-red-600' :
                                        key === 'ataque' ? 'text-orange-600' :
                                        key === 'defensa' ? 'text-green-600' :
                                        key === 'ataqueEspecial' ? 'text-yellow-600' :
                                        key === 'defensaEspecial' ? 'text-purple-600' :
                                        'text-blue-600'
                                    }`}>
                                        {formatearNombre(key)}
                                    </Text>
                                    <Text size="sm" fw={500} className="text-gray-700">
                                        {value}
                                    </Text>
                                </div>
                                <StatBar 
                                    value={value} 
                                    color={statColors[key] || 'bg-gray-500'}
                                />
                            </div>
                        ))}
                    </div>

                    <Space h={30} />

                    {descripcion && (
                        <div className="bg-blue-100 border-2 border-blue-700 rounded-lg p-4">
                            <Text fs={'italic'} size="lg" className="text-gray-800 leading-relaxed text-center">
                                {descripcion.replace(/\n/g, ' ')}
                            </Text>
                        </div>
                    )}
                </Grid.Col>
            </Grid>
        </>
    )
}
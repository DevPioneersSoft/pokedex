import { Flex, Space, Text } from "@mantine/core";
import { useEquipoStore } from "../../layout/store/equipoStore";
import ButtonCustom from "../../layout/components/ButtonCustom";
import CardPokemon from "../../cuadricula/components/CardPokemon";

export default function ListaEquipo() {
    const { equipoDraft, resetDraft } = useEquipoStore();

    return (
        <>
            <Flex align="center" justify="center" gap="md">
                <Text
                    c="var(--color-warning-500)"
                    size="2rem"
                    fw={700}
                    p={6}
                    styles={{
                        root: {
                            borderWidth: 2,
                        },
                    }}
                >
                    Mi equipo
                    <div className="text-2xl text-white font-bold">
                        {equipoDraft.length}/6
                    </div>
                </Text>
            </Flex>
            <Space h="lg" />
            <Flex align={'center'} justify={'center'}>
                <div className="flex gap-2 p-10 bg-red-300 place-content-center rounded-3xl">
                    {equipoDraft.map((pokemon, index) => (
                        <div key={index}>
                            <CardPokemon pokemon={pokemon} />
                        </div>
                    ))}
                </div>
            </Flex>
            <Space h={20} />
            <Flex justify="center" gap={20}>
                <ButtonCustom
                    label="Limpiar"
                    color="secondary"
                    disabled={equipoDraft.length === 0}
                    onClick={() => resetDraft()}
                />
                <ButtonCustom label="Guardar" color="primary" />
            </Flex>
        </>
    );
}

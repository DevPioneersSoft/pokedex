import { Flex, Space, Text } from "@mantine/core"
import { useEquipoStore } from "../../layout/store/equipoStore"
import CardPokemon from "../../cuadricula/components/CardPokemon";
import ButtonCustom from "../../layout/components/ButtonCustom";

export default function ListaEquipo() {

    const { equipoDraft, resetDraft } = useEquipoStore()

  return (
    <>
        <Flex align={'center'}  justify={'center'} gap={'md'}>
            <Text
                c={ 'var(--color-warning-500'}
                size='2rem'
                fw={700}
                p={6}
                styles={{
                    root: {
                        borderwidth: 2,
                    }
                }}
            >
                Mi equipo
            </Text>
            <div className='text-2xl text-white font-bold'>
                {equipoDraft.length}/6
            </div>
        </Flex>
        <Space h={'1g'} />
        <Flex align={'center'} justify={'center'}>
            <div className="flex gap-2 p-10 bg-blue-300 place-content-center rounded-3xl">
                {
                    equipoDraft.map((pokemon, index) => {
                        return (
                        <div key={index}>
                            <CardPokemon pokemon={pokemon} />
                        </div>
                        );
                    })
                }
            </div>
        </Flex>
        <Space h={20} />
        <Flex justify={'center'} gap={20}>
            <ButtonCustom
                label='Limpiar'
                color='secondary'
                disabled={equipoDraft.length === 0}
                onClick={() => resetDraft()}
            />

            <ButtonCustom
                label='Guardar'
                color='primary'
            />
        </Flex>
    </>
  )
}

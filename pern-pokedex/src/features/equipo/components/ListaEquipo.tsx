import { Flex, Space, Text } from "@mantine/core";
import { useEquipoStore } from "../../store/equipoStore";
import ButtonCustom from "../../layout/components/ButtonCustom";
import CardPokemon from "../../cuadricula/components/CardPokemon";

export default function ListaEquipo() {
  const { equipoDraft, resetDraft } = useEquipoStore();

  return (
    <>
    <Space h={20} />
      <Flex align={'center'} justify={'center'} gap={'md'}>
        <Text
          c={'var(--color-info-500)'}
          size={'2rem'}
          fw={700}
          p={6}
        >
          Mi equipo
        </Text>
        <div className="text-2xl text-white font-bold">
          {equipoDraft.length}/6
        </div>
      </Flex>

      <Space h={'lg'} />

      <Flex align={'center'} justify={'center'}>
        <div className="flex flex-wrap w-full gap-1 p-2 bg-blue-300 place-content-center rounded-3xl">
          {equipoDraft.map((pokemon, index) => {
            return (
              <div key={index} style={{ width: '120px', height: '160px' }} className="transform scale-95 origin-top w-1/3">
                <CardPokemon pokemon={pokemon} />
              </div>
            );
          })}
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
  );
}
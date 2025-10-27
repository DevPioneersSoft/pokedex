

import { Flex, Space } from "@mantine/core";
import CardPokemon from "../../cuadricula/components/CardPokemon";
import ButtonCustom from "../../layout/components/ButtonCustom";
import { useEquipoStore } from "../../store/equipoStore";



export default function ListaEquipo() {

    const {equipoDraft, resetDraft} = useEquipoStore();

  return (
    <>
      
        <div className="text-center font-bold text-white"><h1>Mi Equipo:</h1>{equipoDraft.length}/6</div>
        <Space h={'lg'}/>
        <Flex align={'center'} justify={'center'}>
          <div className="flex gap-2 p-10 bg-red-300 place-content- rounded-3xl">
            {
              equipoDraft.map((pokemon, index) =>{
                    return (
                  <div key={index}>
                      <CardPokemon pokemon={pokemon}/>
                  </div>
                );
              })
            }
          </div>
        </Flex>
        <Space h={20}/>
        <Flex justify={'center'} gap={20}>
          <ButtonCustom
              label="Limpiar"
              color="secondary"
              disabled={equipoDraft.length ===0}
              onClick={()=> resetDraft()}/>
          <ButtonCustom
              label="Guardar"
              color="primary"
            />
        </Flex>      
    </>
  )
}

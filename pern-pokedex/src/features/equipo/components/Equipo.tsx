import { useEffect } from "react"
import Cuadricula from "../../cuadricula/components/Cuadricula"
import { useEquipoStore } from "../../layout/store/equipoStore"
import ListaEquipo from "./ListaEquipo"

export default function Equipo() {

  const { addPokemon, resetDraft} = useEquipoStore()

  useEffect(() => {
    return () => {
      resetDraft
    }
  }, [])

  return (
    <>
      <div className="p-10">
        <Cuadricula registrarFavoritos={false} callback={pokemon => addPokemon(pokemon)} />
      </div>
      <ListaEquipo/>
    </>
  )
}

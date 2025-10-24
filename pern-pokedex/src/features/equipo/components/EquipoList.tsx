import { useEquipo } from "../../cuadricula/hooks/useEquipo";
import ButtonCustom from "../../layout/components/ButtonCustom";
import { useEquipoStore } from "../store/EquiopoStore";
import EquipoItem from "./EquipoItem";

export default function EquipoList() {
  const equipo = useEquipoStore(state => state.equipo);
    const guardarEquipo = useEquipo();
  

  return (
    <div className="w-full max-w-md bg-slate-700/60 backdrop-blur-md rounded-2xl shadow-lg p-5 border border-slate-600">
      <h2 className="text-xl font-bold text-amber-300 text-center mb-4">
        Mi equipo Pokémon <span className="text-sm text-slate-300">({equipo.length}/6)</span>
      </h2>

      <ul className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
        {equipo.length > 0 ? (
          equipo.map((pokemon) => (
            <EquipoItem pokemon={pokemon} />
          ))
        ) : (
          <li className="text-center text-slate-300 italic py-8">Sin elementos</li>
        )}
      </ul>

      <div className="mt-6 flex justify-center">
        <ButtonCustom
          label="Guardar equipo"
          color="warning"
          className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold py-2 px-5 rounded-xl transition shadow-md hover:shadow-lg"
          onClick={() => guardarEquipo.mutate()}
        />
      </div>
    </div>
  )
}

import Header from './features/layout/components/Header';
import Cuadricula from './features/layout/components/Cuadricula';
import RefrescarPokemonesButton from './features/layout/components/BotonRefrescarPokemones';
import Paginacion from './features/layout/components/Paginacion';
import BuscadorPokemon from './features/layout/components/BuscadorPokemon';
import { useBuscarPokemones } from './features/ejemploHooks/hooks/useBuscarPokemones';

function App() {
  const {
    cargando,
    error,
    recargando,
    isFetching,
    pokemonsList,
    handleBuscar,
    handleRefrescar,
    handleAnterior,
    handleSiguiente,
    pagina,
    totalPaginas
  } = useBuscarPokemones();

  return (
    <div className='min-h-screen w-full bg-blue-900'>
      <Header />
      <BuscadorPokemon onBuscar={handleBuscar} />
      <RefrescarPokemonesButton onRefrescando={handleRefrescar} />
      <Cuadricula
        cargando={cargando || isFetching}
        recargando={recargando}
        error={error}
        pokemonsList={pokemonsList}
      />
      <Paginacion
        pagina={pagina}
        totalPaginas={totalPaginas}
        handleAnterior={handleAnterior}
        handleSiguiente={handleSiguiente}
      />
    </div>
  );
}

export default App;

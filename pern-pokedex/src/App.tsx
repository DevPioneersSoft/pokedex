import Header from './features/layout/components/Header';
import Cuadricula from './features/cuadricula/componentes/Cuadricula';

function App() {

  return (
    <>
      <div className='min-h-screen w-full bg-gradient-to-br from-secondary-400 to-secondary-800'>
        <Header />
        <Cuadricula />
      </div>
    </>
  )
}

export default App

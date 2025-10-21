import './App.css'
import Header from './features/layout/components/Header';
import Cuadricula from './features/layout/components/cuadricula';

function App() {
  return (
    <>
      <div className="min-h-screen min-w-screen bg-gradient-to-br from-secondary-400 to-secondary-900 pb-10">
        <Header />
        <Cuadricula />
      </div>
    </>
  )
}

export default App

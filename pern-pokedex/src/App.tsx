import Cuadricula from "./features/cuadricula/components/Cuadricula";
import Header from "./features/layout/components/Header";

function App() {
  return (
    <>
      <div className="min-h-screen min-w-screen bg-gradient-to-br from-secondary-400 to-secondary-900 pb-10">
        <Header />
        <Cuadricula />
      </div>
    </>
  );
}

export default App;

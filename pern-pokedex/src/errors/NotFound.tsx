import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100" style={{ minHeight: 'calc(100vh - 200px)' }}>
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-400">404</h1>
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Página no encontrada
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Lo sentimos, la página que buscas no existe.
        </p>
        <Link 
          to="/" 
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          Volver al inicio
        </Link>
      </div>
      <div className="mt-8">
        <img 
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/54.png" 
          alt="Psyduck confused" 
          className="w-32 h-32 opacity-50"
        />
      </div>
    </div>
  )
}

export default NotFound
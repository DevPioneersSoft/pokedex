import { useRouteError, Link } from 'react-router-dom'

interface RouteError {
  statusText?: string
  message?: string
  status?: number
}

const ErrorPage = () => {
  const errorPage = useRouteError() as RouteError
  console.error(errorPage)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500 mb-4">¡Oops!</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Algo salió mal
        </h2>
        <p className="text-gray-600 mb-2">
          Lo sentimos, ha ocurrido un error inesperado.
        </p>
        <p className="text-sm text-gray-500 mb-8">
          <i>{errorPage?.statusText || errorPage?.message}</i>
        </p>
        <Link 
          to="/" 
          className="inline-block bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}

export default ErrorPage
import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Pokedex from '../features/cuadricula/componentes/Pokedex'
import NotFound from '../errors/NotFound'
// import ErrorPage from '../errors/ErrorPage'
import ErrorExample from '../errors/Error'
import RutaProtegida from '../features/layout/components/RutaProtegida'
import { EjemploUseReducer } from '../features/ejemplosHooks/EjemploUseReducer'
import CuadriculaEquipo from '../features/cuadricula/componentes/CuadriculaEquipo'

// Componente de prueba que genera un error

// const ErrorTest = () => {
//   throw new Error('Error de prueba para validar la página de error')
// }

export const routes = createBrowserRouter([
  {
    path: '/',
    Component: App,
    errorElement: <ErrorExample />,
    children: [
      {
        path: '/',
        Component: Pokedex,
      },
      {
        path: '/mi-equipo',
        element: <RutaProtegida>
            <CuadriculaEquipo />
        </RutaProtegida>,
      },
      {
        path: '/mi-equipoV2',
        element: <RutaProtegida>
            <EjemploUseReducer />
        </RutaProtegida>,
      },
    //   {
    //     path: '/test-error',
    //     Component: ErrorTest,
    //   },
      {
        path: '*',
        Component: NotFound,
      }
    ]
  }
])

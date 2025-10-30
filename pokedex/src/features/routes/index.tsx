
import { createBrowserRouter } from 'react-router-dom';
import App from '../../App';
import FormularioLogin from '../layout/components/FormularioLogin';
import FormularioRegistro from '../layout/components/FormularioRegistro';
import ErrorComponent from '../../errors/Error';
import Favoritos from '../favoritos/components/Favoritos';
import Equipo from '../equipo/components/Equipo';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, 
    errorElement: <ErrorComponent />,
  },
  {
    path: '/login',
    element: <FormularioLogin onSubmit={() => {}} onCancel={() => {}} />,
    errorElement: <ErrorComponent />,
  },
  {
    path: '/registro',
    element: <FormularioRegistro onSubmit={() => {}} onCancel={() => {}} />,
    errorElement: <ErrorComponent />,
  },
  {
    path: '/favoritos',
    element: <Favoritos />,
    errorElement: <ErrorComponent />,
  },
  {
    path: '/equipo',
    element: <Equipo />,
    errorElement: <ErrorComponent />,
  },
]);

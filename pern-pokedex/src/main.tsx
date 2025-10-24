import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PokemonModalProvider } from './context/PokemonModalContext';
import { RouterProvider } from 'react-router-dom';
import { routes } from './routes/index.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider>
      <QueryClientProvider client={queryClient}>
        <PokemonModalProvider>
          <RouterProvider router={routes} />
        </PokemonModalProvider>
      </QueryClientProvider>
    </MantineProvider>
  </StrictMode>,
)

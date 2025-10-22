import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@mantine/core/styles.css';
import App from './App.tsx'
import { MantineProvider } from '@mantine/core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PokemonModalProvider } from './context/PokemonModalContext';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider>
      <QueryClientProvider client={queryClient}>
        <PokemonModalProvider>
          <App />
        </PokemonModalProvider>
      </QueryClientProvider>
    </MantineProvider>
  </StrictMode>,
)

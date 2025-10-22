import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
     
      <QueryClientProvider client={queryClient}>
        <MantineProvider>
      <App />
      </MantineProvider>
      </QueryClientProvider>
      
     
    
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LoadingProvider } from './loading/LoadingProvider.tsx';

export const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LoadingProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </LoadingProvider>
  </StrictMode>,
)

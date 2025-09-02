import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import '@/assets/styles/globals.css'
import '@/styles/globals.css'
// import AppRouter from '@/routes/AppRouter'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

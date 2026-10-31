import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './openipl.css'
import OpenIPLApp from './OpenIPLApp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <OpenIPLApp />
  </StrictMode>,
)

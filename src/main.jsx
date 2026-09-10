/**
 * Application Entry Point
 * Mounts the root React 19 application in StrictMode to the DOM element with id 'root'.
 * 
 * Optional:
 * - Register a Service Worker for offline Progressive Web App (PWA) capabilities.
 * - Integrate client-side performance monitoring or error boundary wrappers.
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QRProvider } from './contexts/qrCodeContext.jsx'
import { AuthProvider } from './contexts/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QRProvider>
      <AuthProvider>
        <App/>
      </AuthProvider>
    </QRProvider>
  </StrictMode>,
)

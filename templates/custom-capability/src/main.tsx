import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { AppBridgeProvider } from './AppBridgeProvider.tsx'
import { EpilotThemeProvider } from '@epilot/core-ui';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <AppBridgeProvider>
          <EpilotThemeProvider theme="light">
            <App />
          </EpilotThemeProvider>
      </AppBridgeProvider>
  </StrictMode>,
)

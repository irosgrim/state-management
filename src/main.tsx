import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { globalState } from './lib/state/useGlobalState.ts';
import { appState } from './state/appState.ts';

globalState.setState(appState);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

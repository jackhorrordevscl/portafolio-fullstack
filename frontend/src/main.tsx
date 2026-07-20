import React from "react";
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './styles/global.scss';
import './styles/App.scss';
import { ToastProvider } from './contexts/ToastContext';
import { LoadingProvider } from './contexts/LoadingContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <LoadingProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </LoadingProvider>
    </HelmetProvider>
  </React.StrictMode>
)
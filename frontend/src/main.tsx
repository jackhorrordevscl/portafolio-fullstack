import React from "react";
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/global.scss';
import './styles/App.scss';
import { ToastProvider } from './contexts/ToastContext';
import { LoadingProvider } from './contexts/LoadingContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LoadingProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </LoadingProvider>
  </React.StrictMode>
)
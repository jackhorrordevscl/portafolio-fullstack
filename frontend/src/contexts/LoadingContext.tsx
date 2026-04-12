import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { LinearProgress, Box } from '@mui/material';
import { registerLoadingCallback, clearLoadingCallback } from '../services/globalLoading';

const LoadingContext = createContext<{ isLoading: boolean; setLoading: (v: boolean) => void } | undefined>(undefined);

export const useLoading = () => {
  const ctx = useContext(LoadingContext);
  if (!ctx) throw new Error('useLoading must be used within LoadingProvider');
  return ctx;
};

export const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  // Register a callback so `globalLoading` can toggle this provider's state.
  // The provider subscribes on mount and unsubscribes on unmount.
  useEffect(() => {
    registerLoadingCallback(setIsLoading);
    return () => {
      clearLoadingCallback();
    };
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading: setIsLoading }}>
      <Box sx={{ position: 'relative' }}>
        {isLoading && (
          // Top-fixed progress bar shown while there are active requests.
          // zIndex chosen to appear above page content but under toasts (7000).
          <Box sx={{ position: 'fixed', left: 0, right: 0, top: 0, zIndex: 6000 }}>
            <LinearProgress color="primary" />
          </Box>
        )}
        {children}
      </Box>
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;

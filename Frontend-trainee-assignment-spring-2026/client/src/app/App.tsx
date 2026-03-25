import { useMemo } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { buildTheme } from './theme';
import { queryClient } from '@/shared/lib/queryClient';
import { router } from './routes';
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary';
import { useThemeStore } from '@/stores/theme.store';

export function App() {
  const colorMode = useThemeStore((s) => s.colorMode);
  const theme = useMemo(() => buildTheme(colorMode), [colorMode]);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

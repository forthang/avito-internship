import { createTheme } from '@mui/material/styles';

export function buildTheme(mode: 'light' | 'dark') {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: '#00aaff',
        dark: '#0088cc',
        contrastText: '#fff',
      },
      secondary: {
        main: '#97cf26',
      },
      warning: {
        main: '#f57f17',
      },
      ...(mode === 'light'
        ? {
            background: {
              default: '#ffffff',
              paper: '#fff',
            },
          }
        : {
            background: {
              default: '#121212',
              paper: '#1e1e1e',
            },
          }),
    },
    shape: {
      borderRadius: 0,
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
        },
      },
    },
  });
}

export const theme = buildTheme('light');

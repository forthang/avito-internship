import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Alert, AlertTitle, Button, Box } from '@mui/material';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 8 }}>
          <Alert severity="error">
            <AlertTitle>Что-то пошло не так</AlertTitle>
            {this.state.error?.message}
          </Alert>
          <Button variant="outlined" sx={{ mt: 2 }} onClick={this.handleReset}>
            Попробовать снова
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

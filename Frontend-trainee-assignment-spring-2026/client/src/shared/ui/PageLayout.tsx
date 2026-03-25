import { type ReactNode } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { ThemeToggle } from './ThemeToggle';

interface PageLayoutProps {
  children: ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
          <ThemeToggle />
        </Box>
        {children}
      </Container>
    </Box>
  );
}

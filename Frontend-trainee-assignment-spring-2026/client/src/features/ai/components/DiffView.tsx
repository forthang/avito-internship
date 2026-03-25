import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { diffWords } from 'diff';

interface DiffViewProps {
  oldText: string;
  newText: string;
}

export function DiffView({ oldText, newText }: DiffViewProps) {
  const parts = diffWords(oldText, newText);

  return (
    <Paper variant="outlined" sx={{ overflow: 'hidden' }}>
      <Box sx={{ p: 1.5, bgcolor: 'error.main', color: 'error.contrastText' }}>
        <Typography variant="caption" fontWeight={700}>Было</Typography>
      </Box>
      <Box sx={{ p: 2, whiteSpace: 'pre-wrap', lineHeight: 1.8, bgcolor: 'rgba(244,67,54,0.04)' }}>
        {parts.map((part, i) => {
          if (part.added) return null;
          if (part.removed) {
            return (
              <Box
                key={i}
                component="span"
                sx={{
                  bgcolor: 'rgba(244,67,54,0.15)',
                  textDecoration: 'line-through',
                  color: 'error.dark',
                  px: 0.3,
                }}
              >
                {part.value}
              </Box>
            );
          }
          return <span key={i}>{part.value}</span>;
        })}
      </Box>

      <Divider />

      <Box sx={{ p: 1.5, bgcolor: 'success.main', color: 'success.contrastText' }}>
        <Typography variant="caption" fontWeight={700}>Стало</Typography>
      </Box>
      <Box sx={{ p: 2, whiteSpace: 'pre-wrap', lineHeight: 1.8, bgcolor: 'rgba(76,175,80,0.04)' }}>
        {parts.map((part, i) => {
          if (part.removed) return null;
          if (part.added) {
            return (
              <Box
                key={i}
                component="span"
                sx={{
                  bgcolor: 'rgba(76,175,80,0.18)',
                  color: 'success.dark',
                  fontWeight: 600,
                  px: 0.3,
                }}
              >
                {part.value}
              </Box>
            );
          }
          return <span key={i}>{part.value}</span>;
        })}
      </Box>
    </Paper>
  );
}

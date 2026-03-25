import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { diffWords } from 'diff';

interface DiffViewProps {
  oldText: string;
  newText: string;
}

export function DiffView({ oldText, newText }: DiffViewProps) {
  const parts = diffWords(oldText, newText);

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Изменения
      </Typography>
      <Box sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>
        {parts.map((part, i) => {
          if (part.added) {
            return (
              <Box
                key={i}
                component="span"
                sx={{ bgcolor: 'success.light', color: 'success.contrastText', px: 0.5 }}
              >
                {part.value}
              </Box>
            );
          }
          if (part.removed) {
            return (
              <Box
                key={i}
                component="span"
                sx={{
                  bgcolor: 'error.light',
                  color: 'error.contrastText',
                  textDecoration: 'line-through',
                  px: 0.5,
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

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { DiffView } from './DiffView';

interface AiSuggestionProps {
  suggestion: string;
  onApply: () => void;
  isLoading: boolean;
  currentDescription?: string;
}

export function AiSuggestion({
  suggestion,
  onApply,
  isLoading,
  currentDescription,
}: AiSuggestionProps) {
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (!suggestion) return null;

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Предложение AI
      </Typography>
      <Box sx={{ maxHeight: 200, overflowY: 'auto', mb: 1 }}>
        {currentDescription ? (
          <DiffView oldText={currentDescription} newText={suggestion} />
        ) : (
          <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
            {suggestion}
          </Typography>
        )}
      </Box>
      <Button variant="contained" size="small" onClick={onApply}>
        Применить
      </Button>
    </Paper>
  );
}

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import type { PriceSuggestionData } from '../hooks/useAiPrice';
import { formatPrice } from '@/shared/lib/formatPrice';

interface PriceSuggestionProps {
  data: PriceSuggestionData | null;
  isLoading: boolean;
}

export function PriceSuggestion({ data, isLoading }: PriceSuggestionProps) {
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (!data) return null;

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Рыночная цена
      </Typography>
      <Typography variant="h6">
        {formatPrice(data.min)} - {formatPrice(data.max)}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        {data.reasoning}
      </Typography>
    </Paper>
  );
}

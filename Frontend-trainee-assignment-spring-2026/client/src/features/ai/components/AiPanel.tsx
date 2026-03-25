import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import type { Item } from '@/features/ads/api/items.types';
import { useAiDescription } from '../hooks/useAiDescription';
import { useAiPrice } from '../hooks/useAiPrice';
import { AiSuggestion } from './AiSuggestion';
import { PriceSuggestion } from './PriceSuggestion';
import { AiChat } from './AiChat';

interface AiPanelProps {
  item: Item;
  onApplyDescription: (text: string) => void;
  currentDescription: string;
}

export function AiPanel({
  item,
  onApplyDescription,
  currentDescription,
}: AiPanelProps) {
  const description = useAiDescription();
  const price = useAiPrice();

  const hasDescription = !!currentDescription;

  const handleDescriptionClick = () => {
    const itemWithDesc = { ...item, description: currentDescription };
    description.mutate({
      item: itemWithDesc,
      mode: hasDescription ? 'improve' : 'generate',
    });
  };

  const handlePriceClick = () => {
    price.mutate(item);
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h6">AI-ассистент</Typography>

      <Button
        variant="outlined"
        startIcon={<AutoFixHighIcon />}
        onClick={handleDescriptionClick}
        disabled={description.isPending}
        fullWidth
      >
        {hasDescription ? 'Улучшить описание' : 'Сгенерировать описание'}
      </Button>

      <AiSuggestion
        suggestion={description.data ?? ''}
        onApply={() => {
          if (description.data) onApplyDescription(description.data);
        }}
        isLoading={description.isPending}
        currentDescription={hasDescription ? currentDescription : undefined}
      />

      <Button
        variant="outlined"
        startIcon={<PriceCheckIcon />}
        onClick={handlePriceClick}
        disabled={price.isPending}
        fullWidth
      >
        Узнать рыночную цену
      </Button>

      <PriceSuggestion
        data={price.data ?? null}
        isLoading={price.isPending}
      />

      <AiChat item={item} />
    </Stack>
  );
}

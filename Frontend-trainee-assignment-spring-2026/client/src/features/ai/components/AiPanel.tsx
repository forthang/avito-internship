import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
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
  const [showDescription, setShowDescription] = useState(true);
  const [showPrice, setShowPrice] = useState(true);

  const hasDescription = !!currentDescription;

  const handleDescriptionClick = () => {
    const itemWithDesc = { ...item, description: currentDescription };
    description.mutate({
      item: itemWithDesc,
      mode: hasDescription ? 'improve' : 'generate',
    });
    setShowDescription(true);
  };

  const handlePriceClick = () => {
    price.mutate(item);
    setShowPrice(true);
  };

  return (
    <Box sx={{ position: 'sticky', top: 24, maxHeight: 'calc(100vh - 48px)', overflowY: 'auto' }}>
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

        <Collapse in={showDescription && (description.isPending || !!description.data)}>
          <Box sx={{ position: 'relative' }}>
            {description.data && (
              <IconButton
                size="small"
                onClick={() => setShowDescription(false)}
                sx={{ position: 'absolute', right: 4, top: 4, zIndex: 1 }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            )}
            <AiSuggestion
              suggestion={description.data ?? ''}
              onApply={() => {
                if (description.data) onApplyDescription(description.data);
                setShowDescription(false);
              }}
              isLoading={description.isPending}
              currentDescription={hasDescription ? currentDescription : undefined}
            />
          </Box>
        </Collapse>

        <Button
          variant="outlined"
          startIcon={<PriceCheckIcon />}
          onClick={handlePriceClick}
          disabled={price.isPending}
          fullWidth
        >
          Узнать рыночную цену
        </Button>

        <Collapse in={showPrice && (price.isPending || !!price.data)}>
          <Box sx={{ position: 'relative' }}>
            {price.data && (
              <IconButton
                size="small"
                onClick={() => setShowPrice(false)}
                sx={{ position: 'absolute', right: 4, top: 4, zIndex: 1 }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            )}
            <PriceSuggestion
              data={price.data ?? null}
              isLoading={price.isPending}
            />
          </Box>
        </Collapse>

        <AiChat item={item} />
      </Stack>
    </Box>
  );
}

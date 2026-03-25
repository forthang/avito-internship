import { useMutation } from '@tanstack/react-query';
import { aiComplete } from '../api/ai.api';
import { buildPricePrompt } from '../prompts/price';
import type { Item } from '@/features/ads/api/items.types';

export interface PriceSuggestionData {
  min: number;
  max: number;
  reasoning: string;
}

export function useAiPrice() {
  return useMutation({
    mutationFn: async (item: Item): Promise<PriceSuggestionData> => {
      const messages = buildPricePrompt(item);
      const raw = await aiComplete(messages);
      const cleaned = raw.replace(/```json\n?|```\n?/g, '').trim();
      return JSON.parse(cleaned) as PriceSuggestionData;
    },
  });
}

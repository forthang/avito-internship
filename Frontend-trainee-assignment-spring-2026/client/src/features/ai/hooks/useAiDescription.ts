import { useMutation } from '@tanstack/react-query';
import { aiComplete } from '../api/ai.api';
import { buildDescriptionPrompt } from '../prompts/description';
import type { Item } from '@/features/ads/api/items.types';

export function useAiDescription() {
  return useMutation({
    mutationFn: ({
      item,
      mode,
    }: {
      item: Item;
      mode: 'generate' | 'improve';
    }) => {
      const messages = buildDescriptionPrompt(item, mode);
      return aiComplete(messages);
    },
  });
}

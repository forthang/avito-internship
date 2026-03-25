import type { ChatMessage } from '../api/ai.types';
import type { Item } from '@/features/ads/api/items.types';
import { CATEGORY_LABELS } from '@/shared/lib/constants';

export function buildPricePrompt(item: Item): ChatMessage[] {
  const paramsText = Object.entries(item.params)
    .filter(([, v]) => v !== undefined && v !== '')
    .map(([k, v]) => `${k}: ${v}`)
    .join(', ');

  return [
    {
      role: 'system',
      content:
        'Ты рыночный аналитик. Оцени рыночную стоимость товара. Отвечай строго в JSON формате: { "min": number, "max": number, "reasoning": "string" }. Без дополнительного текста.',
    },
    {
      role: 'user',
      content: `Оцени рыночную стоимость.\nКатегория: ${CATEGORY_LABELS[item.category]}\nНазвание: ${item.title}\nТекущая цена: ${item.price}\nПараметры: ${paramsText}`,
    },
  ];
}

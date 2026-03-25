import type { ChatMessage } from '../api/ai.types';
import type { Item } from '@/features/ads/api/items.types';
import { CATEGORY_LABELS } from '@/shared/lib/constants';

export function buildDescriptionPrompt(
  item: Item,
  mode: 'generate' | 'improve',
): ChatMessage[] {
  const paramsText = Object.entries(item.params)
    .filter(([, v]) => v !== undefined && v !== '')
    .map(([k, v]) => `${k}: ${v}`)
    .join(', ');

  const userContent =
    mode === 'improve'
      ? `Улучши описание для объявления.\nКатегория: ${CATEGORY_LABELS[item.category]}\nНазвание: ${item.title}\nЦена: ${item.price}\nПараметры: ${paramsText}\nТекущее описание: ${item.description}`
      : `Сгенерируй описание для объявления.\nКатегория: ${CATEGORY_LABELS[item.category]}\nНазвание: ${item.title}\nЦена: ${item.price}\nПараметры: ${paramsText}`;

  return [
    {
      role: 'system',
      content:
        'Ты эксперт-копирайтер Авито. Пиши продающие описания для объявлений. Отвечай только текстом описания, без пояснений.',
    },
    {
      role: 'user',
      content: userContent,
    },
  ];
}

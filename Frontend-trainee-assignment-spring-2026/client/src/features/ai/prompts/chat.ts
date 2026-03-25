import type { Item } from '@/features/ads/api/items.types';
import { CATEGORY_LABELS } from '@/shared/lib/constants';

export function buildChatSystemPrompt(item: Item): string {
  const paramsText = Object.entries(item.params)
    .filter(([, v]) => v !== undefined && v !== '')
    .map(([k, v]) => `${k}: ${v}`)
    .join(', ');

  return `Ты AI-ассистент для редактирования объявлений на Авито. Помогай пользователю улучшить объявление.

Контекст объявления:
- Категория: ${CATEGORY_LABELS[item.category]}
- Название: ${item.title}
- Описание: ${item.description ?? 'нет'}
- Цена: ${item.price}
- Параметры: ${paramsText}

Отвечай кратко и по делу.`;
}

import { useMemo } from 'react';
import type { Item } from '../api/items.types';
import {
  AUTO_PARAM_LABELS,
  REAL_ESTATE_PARAM_LABELS,
  ELECTRONICS_PARAM_LABELS,
} from '@/shared/lib/constants';

const PARAM_LABELS_MAP = {
  auto: AUTO_PARAM_LABELS,
  real_estate: REAL_ESTATE_PARAM_LABELS,
  electronics: ELECTRONICS_PARAM_LABELS,
} as const;

export function getRevisionFields(item: Item | undefined): string[] {
  if (!item) return [];

  const missing: string[] = [];

  if (!item.description) {
    missing.push('Описание');
  }

  const labels = PARAM_LABELS_MAP[item.category];
  const params = item.params as Record<string, unknown>;

  for (const key of Object.keys(labels)) {
    const value = params[key];
    if (value === undefined || value === null || value === '') {
      missing.push(labels[key]);
    }
  }

  return missing;
}

export function useRevisionFields(item: Item | undefined): string[] {
  return useMemo(() => getRevisionFields(item), [item]);
}

import { useCallback, useEffect, useRef } from 'react';
import type { ItemUpdatePayload } from '@/features/ads/api/items.types';

const DEBOUNCE_MS = 1000;

function getKey(id: number) {
  return `draft-${id}`;
}

export function useDraftStorage(id: number) {
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const hasDraft = useCallback((): boolean => {
    return localStorage.getItem(getKey(id)) !== null;
  }, [id]);

  const loadDraft = useCallback((): ItemUpdatePayload | null => {
    const raw = localStorage.getItem(getKey(id));
    if (!raw) return null;
    try {
      return JSON.parse(raw) as ItemUpdatePayload;
    } catch {
      return null;
    }
  }, [id]);

  const saveDraft = useCallback(
    (data: ItemUpdatePayload) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        localStorage.setItem(getKey(id), JSON.stringify(data));
      }, DEBOUNCE_MS);
    },
    [id],
  );

  const clearDraft = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    localStorage.removeItem(getKey(id));
  }, [id]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return { loadDraft, saveDraft, clearDraft, hasDraft };
}

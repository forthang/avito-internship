import type { ItemUpdatePayload } from './items.types';

const STORAGE_KEY = 'local-edits';

type LocalEditsMap = Record<number, ItemUpdatePayload & { savedAt: string }>;

function getAll(): LocalEditsMap {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveAll(edits: LocalEditsMap) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(edits));
}

export function saveLocalEdit(id: number, payload: ItemUpdatePayload) {
  const edits = getAll();
  edits[id] = { ...payload, savedAt: new Date().toISOString() };
  saveAll(edits);
}

export function getLocalEdit(id: number): (ItemUpdatePayload & { savedAt: string }) | null {
  return getAll()[id] || null;
}

export function clearLocalEdit(id: number) {
  const edits = getAll();
  delete edits[id];
  saveAll(edits);
}

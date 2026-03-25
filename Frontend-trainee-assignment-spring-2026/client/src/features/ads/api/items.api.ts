import { api } from '@/shared/lib/axios';
import type {
  Item,
  ItemsListResponse,
  ItemsQueryParams,
  ItemUpdatePayload,
} from './items.types';

export async function getItems(
  params: ItemsQueryParams,
  signal?: AbortSignal,
): Promise<ItemsListResponse> {
  const searchParams: Record<string, string> = {};

  if (params.q) searchParams.q = params.q;
  if (params.limit !== undefined) searchParams.limit = String(params.limit);
  if (params.skip !== undefined) searchParams.skip = String(params.skip);
  if (params.categories?.length)
    searchParams.categories = params.categories.join(',');
  if (params.needsRevision) searchParams.needsRevision = 'true';
  if (params.sortColumn) searchParams.sortColumn = params.sortColumn;
  if (params.sortDirection) searchParams.sortDirection = params.sortDirection;

  const { data } = await api.get<ItemsListResponse>('/items', {
    params: searchParams,
    signal,
  });
  return data;
}

export async function getItem(
  id: number,
  signal?: AbortSignal,
): Promise<Item> {
  const { data } = await api.get<Item>(`/items/${id}`, { signal });
  return data;
}

export async function updateItem(
  id: number,
  payload: ItemUpdatePayload,
): Promise<{ success: boolean }> {
  const { data } = await api.put<{ success: boolean }>(
    `/items/${id}`,
    payload,
  );
  return data;
}

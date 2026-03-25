import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { getItems, getItem, updateItem } from './items.api';
import type { ItemsQueryParams, ItemUpdatePayload } from './items.types';

export const itemsKeys = {
  all: ['items'] as const,
  lists: () => [...itemsKeys.all, 'list'] as const,
  list: (params: ItemsQueryParams) => [...itemsKeys.lists(), params] as const,
  details: () => [...itemsKeys.all, 'detail'] as const,
  detail: (id: number) => [...itemsKeys.details(), id] as const,
};

export function useItems(params: ItemsQueryParams) {
  return useQuery({
    queryKey: itemsKeys.list(params),
    queryFn: ({ signal }) => getItems(params, signal),
  });
}

export function useItem(id: number) {
  return useQuery({
    queryKey: itemsKeys.detail(id),
    queryFn: ({ signal }) => getItem(id, signal),
    enabled: !!id,
  });
}

export function useUpdateItem(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ItemUpdatePayload) => updateItem(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: itemsKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: itemsKeys.lists() });
    },
  });
}

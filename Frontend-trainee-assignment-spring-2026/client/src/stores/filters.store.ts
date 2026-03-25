import { create } from 'zustand';
import type {
  Category,
  ItemSortColumn,
  SortDirection,
} from '@/features/ads/api/items.types';

interface FiltersState {
  search: string;
  categories: Category[];
  needsRevision: boolean;
  page: number;
  sortColumn: ItemSortColumn | undefined;
  sortDirection: SortDirection | undefined;

  setSearch: (search: string) => void;
  toggleCategory: (category: Category) => void;
  setNeedsRevision: (value: boolean) => void;
  setPage: (page: number) => void;
  setSort: (column: ItemSortColumn, direction: SortDirection) => void;
  resetFilters: () => void;
}

const initialState = {
  search: '',
  categories: [] as Category[],
  needsRevision: false,
  page: 1,
  sortColumn: 'createdAt' as ItemSortColumn | undefined,
  sortDirection: 'desc' as SortDirection | undefined,
};

export const useFiltersStore = create<FiltersState>((set) => ({
  ...initialState,

  setSearch: (search) => set({ search, page: 1 }),

  toggleCategory: (category) =>
    set((state) => ({
      categories: state.categories.includes(category)
        ? state.categories.filter((c) => c !== category)
        : [...state.categories, category],
      page: 1,
    })),

  setNeedsRevision: (needsRevision) => set({ needsRevision, page: 1 }),

  setPage: (page) => set({ page }),

  setSort: (sortColumn, sortDirection) =>
    set({ sortColumn, sortDirection, page: 1 }),

  resetFilters: () => set(initialState),
}));

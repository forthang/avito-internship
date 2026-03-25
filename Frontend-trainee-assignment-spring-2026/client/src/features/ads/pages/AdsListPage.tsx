import { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Alert from '@mui/material/Alert';
import { useFiltersStore } from '@/stores/filters.store';
import { useItems } from '../api/items.queries';
import { ITEMS_PER_PAGE } from '@/shared/lib/constants';
import { SearchBar } from '../components/SearchBar';
import { SortSelect } from '../components/SortSelect';
import { FilterSidebar } from '../components/FilterSidebar';
import { AdCard } from '../components/AdCard';
import { PaginationBar } from '../components/PaginationBar';
import { LayoutToggle } from '../components/LayoutToggle';
import type { ItemSortColumn, SortDirection } from '../api/items.types';

export default function AdsListPage() {
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');

  const {
    search,
    categories,
    needsRevision,
    page,
    sortColumn,
    sortDirection,
    setSearch,
    toggleCategory,
    setNeedsRevision,
    setPage,
    setSort,
    resetFilters,
  } = useFiltersStore();

  const { data, isLoading, isError } = useItems({
    q: search || undefined,
    limit: ITEMS_PER_PAGE,
    skip: (page - 1) * ITEMS_PER_PAGE,
    categories: categories.length ? categories : undefined,
    needsRevision: needsRevision || undefined,
    sortColumn,
    sortDirection,
  });

  const handleSort = useCallback(
    (column: ItemSortColumn, direction: SortDirection) => {
      setSort(column, direction);
    },
    [setSort],
  );

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={800} sx={{ fontStyle: 'italic' }}>
          Мои объявления
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data ? `${data.total} объявлений` : '...'}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
        <Box sx={{ flex: 1 }}>
          <SearchBar value={search} onChange={setSearch} />
        </Box>
        <LayoutToggle layout={layout} onChange={setLayout} />
        <SortSelect sortColumn={sortColumn} sortDirection={sortDirection} onSort={handleSort} />
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 2.5 }}>
          <FilterSidebar
            selectedCategories={categories}
            needsRevision={needsRevision}
            onToggleCategory={toggleCategory}
            onSetNeedsRevision={setNeedsRevision}
            onReset={resetFilters}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 9.5 }}>
          {isError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Ошибка загрузки объявлений. Попробуйте обновить страницу.
            </Alert>
          )}

          {isLoading && (
            <Grid container spacing={2}>
              {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                <Grid key={i} size={{ xs: 12, sm: 6, md: layout === 'grid' ? 2.4 : 12 }}>
                  <Skeleton variant="rectangular" height={layout === 'grid' ? 240 : 120} />
                </Grid>
              ))}
            </Grid>
          )}

          {data && !isLoading && (
            <>
              {data.items.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                  <Typography variant="h6" color="text.secondary">
                    Объявления не найдены
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Попробуйте изменить параметры поиска или фильтров
                  </Typography>
                </Box>
              ) : (
                <Grid container spacing={2}>
                  {data.items.map((item, idx) => {
                    const globalIndex = (page - 1) * ITEMS_PER_PAGE + idx + 1;
                    return (
                      <Grid
                        key={`${item.title}-${idx}`}
                        size={{
                          xs: 12,
                          sm: layout === 'grid' ? 6 : 12,
                          md: layout === 'grid' ? 2.4 : 12,
                        }}
                      >
                        <AdCard item={item} index={globalIndex} layout={layout} />
                      </Grid>
                    );
                  })}
                </Grid>
              )}

              <PaginationBar
                total={data.total}
                page={page}
                perPage={ITEMS_PER_PAGE}
                onChange={setPage}
              />
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import type { ItemSortColumn, SortDirection } from '../api/items.types';

interface SortOption {
  label: string;
  column: ItemSortColumn;
  direction: SortDirection;
}

const SORT_OPTIONS: SortOption[] = [
  { label: 'По новизне (сначала новые)', column: 'createdAt', direction: 'desc' },
  { label: 'По новизне (сначала старые)', column: 'createdAt', direction: 'asc' },
  { label: 'По названию (А → Я)', column: 'title', direction: 'asc' },
  { label: 'По названию (Я → А)', column: 'title', direction: 'desc' },
  { label: 'По цене (сначала дешевле)', column: 'price', direction: 'asc' },
  { label: 'По цене (сначала дороже)', column: 'price', direction: 'desc' },
];

interface SortSelectProps {
  sortColumn?: ItemSortColumn;
  sortDirection?: SortDirection;
  onSort: (column: ItemSortColumn, direction: SortDirection) => void;
}

export function SortSelect({ sortColumn, sortDirection, onSort }: SortSelectProps) {
  const currentValue = sortColumn && sortDirection
    ? `${sortColumn}-${sortDirection}`
    : 'createdAt-desc';

  const handleChange = (e: SelectChangeEvent) => {
    const [column, direction] = e.target.value.split('-') as [ItemSortColumn, SortDirection];
    onSort(column, direction);
  };

  return (
    <FormControl size="small" sx={{ minWidth: 260 }}>
      <Select
        value={currentValue}
        onChange={handleChange}
        sx={{
          borderRadius: 0,
          backgroundColor: 'background.paper',
        }}
      >
        {SORT_OPTIONS.map((opt) => (
          <MenuItem key={`${opt.column}-${opt.direction}`} value={`${opt.column}-${opt.direction}`}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

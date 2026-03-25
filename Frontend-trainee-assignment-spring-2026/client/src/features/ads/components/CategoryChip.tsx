import Chip from '@mui/material/Chip';
import type { Category } from '../api/items.types';
import { CATEGORY_LABELS } from '@/shared/lib/constants';

interface CategoryChipProps {
  category: Category;
}

export function CategoryChip({ category }: CategoryChipProps) {
  return (
    <Chip
      label={CATEGORY_LABELS[category]}
      size="small"
      variant="outlined"
      sx={{
        fontWeight: 500,
        fontSize: '0.75rem',
        height: 24,
        borderColor: '#E0E0E0',
        color: '#424242',
        backgroundColor: '#FFFFFF',
      }}
    />
  );
}

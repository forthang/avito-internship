import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { Item } from '../api/items.types';
import {
  AUTO_PARAM_LABELS,
  REAL_ESTATE_PARAM_LABELS,
  ELECTRONICS_PARAM_LABELS,
  TRANSMISSION_LABELS,
  REAL_ESTATE_TYPE_LABELS,
  ELECTRONICS_TYPE_LABELS,
  CONDITION_LABELS,
} from '@/shared/lib/constants';

const PARAM_LABELS_MAP = {
  auto: AUTO_PARAM_LABELS,
  real_estate: REAL_ESTATE_PARAM_LABELS,
  electronics: ELECTRONICS_PARAM_LABELS,
} as const;

const ENUM_LABELS: Record<string, Record<string, string>> = {
  'auto.transmission': TRANSMISSION_LABELS,
  'real_estate.type': REAL_ESTATE_TYPE_LABELS,
  'electronics.type': ELECTRONICS_TYPE_LABELS,
  'electronics.condition': CONDITION_LABELS,
};

function formatValue(category: string, key: string, value: unknown): string {
  const enumKey = `${category}.${key}`;
  const labels = ENUM_LABELS[enumKey];
  if (labels && typeof value === 'string' && labels[value]) {
    return labels[value];
  }
  return String(value);
}

interface ItemParamsProps {
  item: Item;
}

export function ItemParams({ item }: ItemParamsProps) {
  const labels = PARAM_LABELS_MAP[item.category];
  const params = item.params as Record<string, unknown>;

  const entries = Object.keys(labels)
    .filter((key) => {
      const v = params[key];
      return v !== undefined && v !== null && v !== '';
    })
    .map((key) => ({
      label: labels[key],
      value: formatValue(item.category, key, params[key]),
    }));

  if (entries.length === 0) return null;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Характеристики
      </Typography>
      <Box
        component="table"
        sx={{
          width: '100%',
          borderCollapse: 'collapse',
          '& td': { py: 1, pr: 2, borderBottom: '1px solid #F0F0F0' },
        }}
      >
        <tbody>
          {entries.map(({ label, value }) => (
            <tr key={label}>
              <Box component="td" sx={{ color: 'text.secondary', width: '40%' }}>
                <Typography variant="body2">{label}</Typography>
              </Box>
              <td>
                <Typography variant="body2">{value}</Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </Box>
    </Box>
  );
}

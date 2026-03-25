import { useFormContext } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import {
  ELECTRONICS_TYPE_LABELS,
  CONDITION_LABELS,
} from '@/shared/lib/constants';

export function ElectronicsParamsFields() {
  const { register } = useFormContext();

  return (
    <>
      <TextField
        label="Тип"
        select
        fullWidth
        defaultValue=""
        {...register('params.type')}
      >
        {Object.entries(ELECTRONICS_TYPE_LABELS).map(([value, label]) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Бренд"
        fullWidth
        {...register('params.brand')}
      />
      <TextField
        label="Модель"
        fullWidth
        {...register('params.model')}
      />
      <TextField
        label="Цвет"
        fullWidth
        {...register('params.color')}
      />
      <TextField
        label="Состояние"
        select
        fullWidth
        defaultValue=""
        {...register('params.condition')}
      >
        {Object.entries(CONDITION_LABELS).map(([value, label]) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </TextField>
    </>
  );
}

import { useFormContext } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { REAL_ESTATE_TYPE_LABELS } from '@/shared/lib/constants';

export function RealEstateParamsFields() {
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
        {Object.entries(REAL_ESTATE_TYPE_LABELS).map(([value, label]) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Адрес"
        fullWidth
        {...register('params.address')}
      />
      <TextField
        label="Площадь"
        type="number"
        fullWidth
        {...register('params.area', { valueAsNumber: true })}
      />
      <TextField
        label="Этаж"
        type="number"
        fullWidth
        {...register('params.floor', { valueAsNumber: true })}
      />
    </>
  );
}

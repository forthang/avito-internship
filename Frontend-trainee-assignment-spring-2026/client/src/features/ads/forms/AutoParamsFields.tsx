import { useFormContext } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { TRANSMISSION_LABELS } from '@/shared/lib/constants';

export function AutoParamsFields() {
  const { register } = useFormContext();

  return (
    <>
      <TextField
        label="Марка"
        fullWidth
        {...register('params.brand')}
      />
      <TextField
        label="Модель"
        fullWidth
        {...register('params.model')}
      />
      <TextField
        label="Год выпуска"
        type="number"
        fullWidth
        {...register('params.yearOfManufacture', { valueAsNumber: true })}
      />
      <TextField
        label="Пробег"
        type="number"
        fullWidth
        {...register('params.mileage', { valueAsNumber: true })}
      />
      <TextField
        label="Мощность двигателя"
        type="number"
        fullWidth
        {...register('params.enginePower', { valueAsNumber: true })}
      />
      <TextField
        label="Коробка передач"
        select
        fullWidth
        defaultValue=""
        {...register('params.transmission')}
      >
        {Object.entries(TRANSMISSION_LABELS).map(([value, label]) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </TextField>
    </>
  );
}

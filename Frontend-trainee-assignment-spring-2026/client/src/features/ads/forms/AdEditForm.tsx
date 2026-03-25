import { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import type { Item, ItemUpdatePayload } from '@/features/ads/api/items.types';
import { CATEGORY_LABELS } from '@/shared/lib/constants';
import { AutoParamsFields } from './AutoParamsFields';
import { RealEstateParamsFields } from './RealEstateParamsFields';
import { ElectronicsParamsFields } from './ElectronicsParamsFields';

const DESCRIPTION_MAX = 1500;

interface AdEditFormProps {
  item: Item;
  onSubmit: (data: ItemUpdatePayload) => void;
  isSubmitting: boolean;
  draftValues?: ItemUpdatePayload | null;
  onWatch?: (data: ItemUpdatePayload) => void;
  appliedDescription?: string | null;
}

export function AdEditForm({
  item,
  onSubmit,
  isSubmitting,
  draftValues,
  onWatch,
  appliedDescription,
}: AdEditFormProps) {
  const methods = useForm<ItemUpdatePayload>({
    defaultValues: {
      title: item.title,
      description: item.description ?? '',
      price: item.price ?? 0,
      params: item.params,
    },
  });

  const { register, handleSubmit, watch, setValue, formState, reset } = methods;
  const description = watch('description') ?? '';

  useEffect(() => {
    if (draftValues) {
      reset(draftValues);
    }
  }, [draftValues, reset]);

  useEffect(() => {
    if (appliedDescription !== undefined && appliedDescription !== null) {
      setValue('description', appliedDescription);
    }
  }, [appliedDescription, setValue]);

  useEffect(() => {
    if (!onWatch) return;
    const sub = watch((data) => {
      if (formState.isDirty) {
        onWatch(data as ItemUpdatePayload);
      }
    });
    return () => sub.unsubscribe();
  }, [watch, onWatch, formState.isDirty]);

  const paramsFields = {
    auto: <AutoParamsFields />,
    real_estate: <RealEstateParamsFields />,
    electronics: <ElectronicsParamsFields />,
  };

  return (
    <FormProvider {...methods}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Typography variant="subtitle2" color="text.secondary">
            Категория: {CATEGORY_LABELS[item.category]}
          </Typography>

          <TextField
            label="Название"
            fullWidth
            required
            error={!!formState.errors.title}
            helperText={formState.errors.title?.message}
            {...register('title', { required: 'Обязательное поле' })}
          />

          <Box>
            <TextField
              label="Описание"
              fullWidth
              multiline
              minRows={4}
              inputProps={{ maxLength: DESCRIPTION_MAX }}
              {...register('description')}
            />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block', textAlign: 'right' }}>
              {description.length}/{DESCRIPTION_MAX}
            </Typography>
          </Box>

          <TextField
            label="Цена"
            type="number"
            fullWidth
            required
            error={!!formState.errors.price}
            helperText={formState.errors.price?.message}
            {...register('price', {
              valueAsNumber: true,
              required: 'Обязательное поле',
              min: { value: 0, message: 'Цена не может быть отрицательной' },
            })}
          />

          <Typography variant="h6" sx={{ pt: 1 }}>
            Параметры
          </Typography>

          {paramsFields[item.category]}

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </Stack>
      </Box>
    </FormProvider>
  );
}

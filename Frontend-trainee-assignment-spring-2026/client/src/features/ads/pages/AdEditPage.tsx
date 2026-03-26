import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { useItem, useUpdateItem } from '@/features/ads/api/items.queries';
import type { ItemUpdatePayload } from '@/features/ads/api/items.types';
import { AdEditForm } from '@/features/ads/forms/AdEditForm';
import { AiPanel } from '@/features/ai/components/AiPanel';
import { useDraftStorage } from '@/features/ads/hooks/useDraftStorage';

export default function AdEditPage() {
  const { id } = useParams<{ id: string }>();
  const numId = Number(id);
  const navigate = useNavigate();
  const { data: item, isLoading, error } = useItem(numId);
  const updateItem = useUpdateItem(numId);
  const { loadDraft, saveDraft, clearDraft, hasDraft } = useDraftStorage(numId);
  const draftChecked = useRef(false);

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('Объявление сохранено');
  const [snackSeverity, setSnackSeverity] = useState<'success' | 'info'>('success');
  const [draftDialogOpen, setDraftDialogOpen] = useState(false);
  const [draftValues, setDraftValues] = useState<ItemUpdatePayload | null>(null);
  const [currentDescription, setCurrentDescription] = useState('');
  const [appliedDescription, setAppliedDescription] = useState<string | null>(null);

  useEffect(() => {
    if (item && !draftChecked.current) {
      draftChecked.current = true;
      if (hasDraft()) {
        setDraftDialogOpen(true);
      }
    }
  }, [item, hasDraft]);

  useEffect(() => {
    if (item) {
      setCurrentDescription(item.description ?? '');
    }
  }, [item]);

  const handleRestoreDraft = () => {
    const loaded = loadDraft();
    if (loaded) {
      setDraftValues(loaded);
      setCurrentDescription(loaded.description ?? '');
    }
    setDraftDialogOpen(false);
  };

  const handleDiscardDraft = () => {
    clearDraft();
    setDraftDialogOpen(false);
  };

  const handleSubmit = useCallback(
    (data: ItemUpdatePayload) => {
      updateItem.mutate(data, {
        onSuccess: (result) => {
          clearDraft();
          if (result.local) {
            setSnackMessage('Сохранено локально (сервер недоступен для PUT)');
            setSnackSeverity('info');
          } else {
            setSnackMessage('Объявление сохранено');
            setSnackSeverity('success');
          }
          setSnackOpen(true);
          setTimeout(() => navigate(`/ads/${numId}`), 1500);
        },
      });
    },
    [updateItem, clearDraft, navigate, numId],
  );

  const handleWatch = useCallback(
    (data: ItemUpdatePayload) => {
      saveDraft(data);
      setCurrentDescription(data.description ?? '');
    },
    [saveDraft],
  );

  const handleApplyDescription = useCallback((text: string) => {
    setAppliedDescription(text);
    setCurrentDescription(text);
  }, []);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', pt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !item) {
    return <Typography color="error">Не удалось загрузить объявление</Typography>;
  }

  return (
    <Box>
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link component={RouterLink} to="/ads" underline="hover" color="inherit">
          Объявления
        </Link>
        <Link component={RouterLink} to={`/ads/${numId}`} underline="hover" color="inherit">
          {item.title}
        </Link>
        <Typography color="text.primary">Редактирование</Typography>
      </Breadcrumbs>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5">Редактирование</Typography>
            <Button variant="text" onClick={() => navigate(-1)}>
              Отмена
            </Button>
          </Box>
          <AdEditForm
            item={item}
            onSubmit={handleSubmit}
            isSubmitting={updateItem.isPending}
            draftValues={draftValues}
            onWatch={handleWatch}
            appliedDescription={appliedDescription}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <AiPanel
            item={item}
            onApplyDescription={handleApplyDescription}
            currentDescription={currentDescription}
          />
        </Grid>
      </Grid>

      <Dialog open={draftDialogOpen} onClose={handleDiscardDraft}>
        <DialogTitle>Несохранённый черновик</DialogTitle>
        <DialogContent>
          <DialogContentText>
            У вас есть несохранённый черновик. Восстановить?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDiscardDraft}>Отклонить</Button>
          <Button onClick={handleRestoreDraft} variant="contained">
            Восстановить
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={() => setSnackOpen(false)}
      >
        <Alert severity={snackSeverity} onClose={() => setSnackOpen(false)}>
          {snackMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Alert from '@mui/material/Alert';
import Link from '@mui/material/Link';
import ImageIcon from '@mui/icons-material/Image';
import EditIcon from '@mui/icons-material/Edit';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import { useItem } from '../api/items.queries';
import { useRevisionFields } from '../hooks/useRevisionFields';
import { RevisionWarning } from '../components/RevisionWarning';
import { ItemParams } from '../components/ItemParams';
import { CategoryChip } from '../components/CategoryChip';
import { formatPrice } from '@/shared/lib/formatPrice';
import { formatDate } from '@/shared/lib/formatDate';

function AdDetailContent() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: item, isLoading, isError } = useItem(Number(id));
  const missingFields = useRevisionFields(item);

  if (isLoading) {
    return (
      <Box sx={{ maxWidth: 800 }}>
        <Skeleton width={300} height={32} />
        <Skeleton width="100%" height={300} sx={{ mt: 2 }} variant="rectangular" />
        <Skeleton width="60%" height={40} sx={{ mt: 2 }} />
        <Skeleton width="40%" height={24} sx={{ mt: 1 }} />
        <Skeleton width="100%" height={120} sx={{ mt: 2 }} />
      </Box>
    );
  }

  if (isError || !item) {
    return (
      <Alert severity="error">
        Не удалось загрузить объявление
      </Alert>
    );
  }

  return (
    <Box sx={{ maxWidth: 800 }}>
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link component={RouterLink} to="/" underline="hover" color="inherit">
          Объявления
        </Link>
        <Typography color="text.primary">{item.title}</Typography>
      </Breadcrumbs>

      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2, mb: 2 }}>
        <Box>
          <Typography variant="h4" fontWeight={700}>
            {item.title}
          </Typography>
          <Typography variant="h5" sx={{ mt: 1 }}>
            {formatPrice(item.price)}
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          onClick={() => navigate(`/ads/${id}/edit`)}
        >
          Редактировать
        </Button>
      </Box>

      <CategoryChip category={item.category} />

      <Box
        sx={{
          width: '100%',
          aspectRatio: '16/9',
          backgroundColor: '#EEEEEE',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mt: 2,
          mb: 3,
        }}
      >
        <ImageIcon sx={{ fontSize: 80, color: '#BDBDBD' }} />
      </Box>

      {item.needsRevision && (
        <Box sx={{ mb: 3 }}>
          <RevisionWarning missingFields={missingFields} />
        </Box>
      )}

      <Box sx={{ mb: 3 }}>
        <ItemParams item={item} />
      </Box>

      {item.description && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Описание
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
            {item.description}
          </Typography>
        </Box>
      )}

      <Box sx={{ display: 'flex', gap: 3, color: 'text.secondary' }}>
        <Typography variant="body2">
          Создано: {formatDate(item.createdAt)}
        </Typography>
        <Typography variant="body2">
          Обновлено: {formatDate(item.updatedAt)}
        </Typography>
      </Box>
    </Box>
  );
}

export default function AdDetailPage() {
  return <AdDetailContent />;
}

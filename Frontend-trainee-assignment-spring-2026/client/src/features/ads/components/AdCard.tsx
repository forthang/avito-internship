import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import ImageIcon from '@mui/icons-material/Image';
import { useNavigate } from 'react-router-dom';
import { CategoryChip } from './CategoryChip';
import { formatPrice } from '@/shared/lib/formatPrice';
import type { ItemListItem } from '../api/items.types';

interface AdCardProps {
  item: ItemListItem;
  index: number;
  layout: 'grid' | 'list';
}

export function AdCard({ item, index, layout }: AdCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/ads/${index}`);
  };

  if (layout === 'list') {
    return (
      <Box
        sx={{
          overflow: 'hidden',
          backgroundColor: 'background.paper',
          border: 1,
          borderColor: 'divider',
        }}
      >
        <CardActionArea onClick={handleClick} sx={{ display: 'flex', alignItems: 'stretch', justifyContent: 'flex-start' }}>
          <Box
            sx={{
              width: 160,
              minHeight: 120,
              backgroundColor: 'action.hover',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <ImageIcon sx={{ fontSize: 48, color: 'action.disabled' }} />
          </Box>
          <Box sx={{ p: 2, flex: 1, minWidth: 0 }}>
            <CategoryChip category={item.category} />
            <Typography variant="subtitle2" fontWeight={700} noWrap sx={{ mt: 0.5 }}>
              {item.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {formatPrice(item.price)}
            </Typography>
            {item.needsRevision && (
              <Typography variant="caption" sx={{ color: 'warning.main', mt: 0.5, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Box component="span" sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'warning.main', display: 'inline-block' }} />
                Требует доработок
              </Typography>
            )}
          </Box>
        </CardActionArea>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'background.paper',
        border: 1,
        borderColor: 'divider',
      }}
    >
      <CardActionArea onClick={handleClick} sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
        <Box
          sx={{
            width: '100%',
            aspectRatio: '4/3',
            backgroundColor: 'action.hover',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ImageIcon sx={{ fontSize: 48, color: 'action.disabled' }} />
        </Box>
        <Box sx={{ p: 1.5, flex: 1, display: 'flex', flexDirection: 'column' }}>
          <CategoryChip category={item.category} />
          <Typography variant="subtitle2" fontWeight={700} noWrap sx={{ mt: 0.5 }}>
            {item.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {formatPrice(item.price)}
          </Typography>
          {item.needsRevision && (
            <Typography variant="caption" sx={{ color: 'warning.main', mt: 'auto', pt: 0.5, display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Box component="span" sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'warning.main', display: 'inline-block' }} />
              Требует доработок
            </Typography>
          )}
        </Box>
      </CardActionArea>
    </Box>
  );
}

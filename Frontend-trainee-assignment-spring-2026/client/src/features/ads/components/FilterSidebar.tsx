import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type { Category } from '../api/items.types';
import { CATEGORY_LABELS } from '@/shared/lib/constants';

const ALL_CATEGORIES: Category[] = ['auto', 'electronics', 'real_estate'];

interface FilterSidebarProps {
  selectedCategories: Category[];
  needsRevision: boolean;
  onToggleCategory: (category: Category) => void;
  onSetNeedsRevision: (value: boolean) => void;
  onReset: () => void;
}

export function FilterSidebar({
  selectedCategories,
  needsRevision,
  onToggleCategory,
  onSetNeedsRevision,
  onReset,
}: FilterSidebarProps) {
  return (
    <Paper variant="outlined" sx={{ overflow: 'hidden' }}>
      <Box sx={{ px: 2, pt: 2, pb: 1 }}>
        <Typography variant="subtitle1" fontWeight={700}>
          Фильтры
        </Typography>
      </Box>

      <Accordion defaultExpanded disableGutters elevation={0} sx={{ '&::before': { display: 'none' } }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 2, minHeight: 40 }}>
          <Typography variant="body2" fontWeight={600}>
            Категория
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 2, pt: 0 }}>
          <FormGroup>
            {ALL_CATEGORIES.map((cat) => (
              <FormControlLabel
                key={cat}
                control={
                  <Checkbox
                    size="small"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => onToggleCategory(cat)}
                  />
                }
                label={<Typography variant="body2">{CATEGORY_LABELS[cat]}</Typography>}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      <Box sx={{ px: 2, py: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="body2">Только требующие доработок</Typography>
        <Switch
          size="small"
          checked={needsRevision}
          onChange={(_, checked) => onSetNeedsRevision(checked)}
        />
      </Box>

      <Box sx={{ px: 2, pb: 2 }}>
        <Button
          fullWidth
          variant="text"
          size="small"
          onClick={onReset}
          sx={{ color: 'text.secondary', textTransform: 'none' }}
        >
          Сбросить фильтры
        </Button>
      </Box>
    </Paper>
  );
}

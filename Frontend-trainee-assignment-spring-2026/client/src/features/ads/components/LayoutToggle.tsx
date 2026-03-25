import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';

interface LayoutToggleProps {
  layout: 'grid' | 'list';
  onChange: (layout: 'grid' | 'list') => void;
}

export function LayoutToggle({ layout, onChange }: LayoutToggleProps) {
  return (
    <ToggleButtonGroup
      value={layout}
      exclusive
      onChange={(_, value) => {
        if (value) onChange(value);
      }}
      size="small"
      sx={{
        '& .MuiToggleButton-root': {
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 0,
          px: 1,
        },
        '& .Mui-selected': {
          backgroundColor: 'action.selected',
          color: 'primary.main',
        },
      }}
    >
      <ToggleButton value="grid">
        <GridViewIcon fontSize="small" />
      </ToggleButton>
      <ToggleButton value="list">
        <ViewListIcon fontSize="small" />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

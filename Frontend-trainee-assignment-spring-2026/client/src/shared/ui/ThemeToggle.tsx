import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useThemeStore } from '@/stores/theme.store';

export function ThemeToggle() {
  const { colorMode, toggle } = useThemeStore();

  return (
    <IconButton onClick={toggle} color="inherit">
      {colorMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
}

import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';

interface PaginationBarProps {
  total: number;
  page: number;
  perPage: number;
  onChange: (page: number) => void;
}

export function PaginationBar({ total, page, perPage, onChange }: PaginationBarProps) {
  const count = Math.ceil(total / perPage);

  if (count <= 1) return null;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
      <Pagination
        count={count}
        page={page}
        onChange={(_, value) => onChange(value)}
        shape="circular"
        sx={{
          '& .Mui-selected': {
            backgroundColor: '#FFF3E0 !important',
            color: '#E65100',
            fontWeight: 700,
          },
        }}
      />
    </Box>
  );
}

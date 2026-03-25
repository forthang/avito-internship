import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface RevisionWarningProps {
  missingFields: string[];
}

export function RevisionWarning({ missingFields }: RevisionWarningProps) {
  if (missingFields.length === 0) return null;

  return (
    <Alert severity="warning">
      <Typography variant="body2" fontWeight={600} gutterBottom>
        Объявление требует доработки
      </Typography>
      <Box component="ul" sx={{ m: 0, pl: 2 }}>
        {missingFields.map((field) => (
          <li key={field}>
            <Typography variant="body2">{field}</Typography>
          </li>
        ))}
      </Box>
    </Alert>
  );
}

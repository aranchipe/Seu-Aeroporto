'use client';

import { Box, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

export function Loading() {
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      <CircularProgress
        size="200px"
        sx={{
          color: 'red',
        }}
      />
      <Typography variant="h6" sx={{ textAlign: 'center', width: '100%' }}>
        Carregando...
      </Typography>
    </Box>
  );
}

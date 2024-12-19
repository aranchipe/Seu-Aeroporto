'use client';

import { Box, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

export function Loading() {
  return (
    <Box
      sx={{
        position: 'fixed', // Fixa o componente na tela
        top: 0,
        left: 0,
        height: '100vh', // Altura da tela inteira
        width: '100vw', // Largura da tela inteira
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        zIndex: 9999, // Garante que o componente apareça sobre os outros
      }}
    >
      <CircularProgress
        size="100px"
        sx={{
          color: '#004489',
        }}
      />
      <Typography variant="h6" sx={{ textAlign: 'center', width: '100%' }}>
        Carregando...
      </Typography>
    </Box>
  );
}

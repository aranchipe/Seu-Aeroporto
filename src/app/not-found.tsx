import { Box, CardMedia } from '@mui/material';

export default function NotFound() {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box>
        <CardMedia component="img" image="/imgError404.png" sx={{ width: { xs: '100%', sm: '50vw' } }} />
      </Box>
    </Box>
  );
}

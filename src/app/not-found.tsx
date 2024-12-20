import { Box } from '@mui/material';

export default function NotFound() {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <h1>teste</h1>
      {/* <CardMedia component="img" image="/imgError404.png" sx={{ width: '40%' }} /> */}
    </Box>
  );
}

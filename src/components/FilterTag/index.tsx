import { poppins } from '@/app/fonts';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Typography } from '@mui/material';

interface FilterTagProps {
  tagLabel?: string;
  setOpenMenu: (value: boolean) => void;
  setSegment: (value: string) => void;
}

const FilterTag = ({ tagLabel, setOpenMenu, setSegment }: FilterTagProps) => {
  return (
    <Box
      sx={{
        backgroundColor: '#E8EEF4',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        color: '#004489',
        padding: '13px 15px',
        border: '1px solid #004489',
        borderRadius: '5px',
        position: 'relative',
        gap: '10px',
      }}
    >
      <Typography
        fontWeight={'bold'}
        sx={{
          fontFamily: poppins.style.fontFamily,
          fontWeight: 600,
          fontSize: '14px',
        }}
      >
        {tagLabel}
      </Typography>
      <CloseIcon
        onClick={() => {
          setOpenMenu(false);
          setSegment('');
        }}
        sx={{
          color: '004489',
          fontSize: 'medium',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
      />
    </Box>
  );
};

export default FilterTag;

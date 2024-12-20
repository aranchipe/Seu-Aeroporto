import { poppins } from '@/app/fonts';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Typography } from '@mui/material';
import * as React from 'react';

interface FilterTagProps {
  tagLabel?: string;
  setOpenMenu?: React.Dispatch<React.SetStateAction<any>>;
  setSegments?: React.Dispatch<React.SetStateAction<any>>;
}

const FilterTag: React.FC<FilterTagProps> = ({ tagLabel, setOpenMenu, setSegments }) => {
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
          setOpenMenu && setOpenMenu(false);
          setSegments && setSegments('');
        }}
        sx={{
          color: '004489',
          fontSize: 'medium',
          fontWeight: 'bold',
          cursor: 'pointer',
          /* position: 'absolute',
          right: '8px', */
        }}
      />
    </Box>
  );
};

export default FilterTag;

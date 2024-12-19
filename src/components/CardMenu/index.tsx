import { useTranslation } from '@/hooks/useTranslation';
import { CardMenuProps } from '@/interfaces/home';
import { poppins } from '@/styles/theme';
import { isValidTranslationKey } from '@/utils/translationKeyValidation';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

const CardMenu: React.FC<CardMenuProps> = ({ label, backgroundColor, textColor, icon, size, onClick }) => {
  const { t } = useTranslation();

  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        flexDirection: size !== 'medium' ? 'column' : 'row-reverse',
        justifyContent: size === 'medium' ? 'space-between' : '',
        alignItems: size === 'medium' ? 'center' : '',
        backgroundColor: backgroundColor,
        height: size === 'medium' ? '10vh' : '18vh',
        borderRadius: '10px',
        position: size !== 'medium' ? 'relative' : '',
        padding: size === 'medium' ? '5%' : '',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: size === 'large' ? 'end' : 'center',
          alignItems: 'center',
          height: '100%',
          padding: size !== 'medium' ? '0 20%' : '',
        }}
      >
        <Image alt="icon" src={icon} width={40} height={40} />
      </Box>

      <Typography
        sx={{
          color: textColor,
          position: size !== 'medium' ? 'absolute' : '',
          bottom: '10%',
          left: '5%',
          fontFamily: poppins.style.fontFamily,
          fontWeight: 600,
          fontSize: { xs: '10px', sm: '16px' },
          width: size === 'medium' ? { xs: '150px' } : { xs: '80px', sm: '100px' },
        }}
      >
        {label && isValidTranslationKey(label) ? t(label) : label}
      </Typography>
    </Box>
  );
};

export default CardMenu;

import { MenuProps } from '@/app/(paginas)/[path]/page';
import { poppins } from '@/app/fonts';
import { useTranslation } from '@/hooks/useTranslation';
import axios from '@/services/axios';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const NavigationHeader: React.FC<{ path: string; label?: string }> = ({ path, label }) => {
  const router = useRouter();
  const [menuData, setMenuData] = useState<MenuProps | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    handleNavigationHeader(path);
  }, []);

  const handleNavigationHeader = async (path: string) => {
    try {
      const menu: MenuProps[] = (await axios.get('/menu')).data;

      const currentPage =
        menu.find((item) => {
          return item.ref === `/${path}`;
        }) || null;

      setMenuData(currentPage);
    } catch (error) {
      console.error('Erro ao buscar menu:', error);
    }
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '6vh',
        backgroundColor: menuData?.backgroundColor,
        position: 'fixed',
        top: '12vh',
        display: 'flex',
        alignItems: 'center',
        padding: { xs: '0 4vw', sm: '0 1.5vw' },
        color: '#ffffff',
        zIndex: 10,
      }}
    >
      <Box
        sx={{
          marginRight: { xs: '4vw', sm: '1.5vw' },
        }}
      >
        <Box onClick={() => router.back()}>
          <ArrowBackIosIcon sx={{ cursor: 'pointer' }} />
        </Box>
      </Box>
      <Typography
        sx={{
          fontFamily: poppins.style.fontFamily,
          fontWeight: 500,
        }}
      >
        {label ? t(label) : t(menuData?.label)}
      </Typography>
    </Box>
  );
};

export default NavigationHeader;

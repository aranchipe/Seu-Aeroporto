import { poppins } from '@/app/fonts';
import { useTranslation } from '@/hooks/useTranslation';
import { MenuProps } from '@/interfaces/[path]';
import axios from '@/services/axios';
import { isValidTranslationKey } from '@/utils/translationKeyValidation';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Loading } from '../Loading';

const NavigationHeader: React.FC<{ path: string; label?: string; adress?: string }> = ({ path, label, adress }) => {
  const router = useRouter();
  const [menuData, setMenuData] = useState<MenuProps | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { t } = useTranslation();

  useEffect(() => {
    handleNavigationHeader(path);
  }, []);

  const handleNavigationHeader = async (path: string) => {
    setLoading(true);
    try {
      const menu: MenuProps[] = (await axios.get('/menu')).data;

      const currentPage =
        menu.find((item) => {
          return item.ref === `/${path}`;
        }) || null;

      setMenuData(currentPage);
    } catch (error) {
      console.error('Erro ao buscar menu:', error);
    } finally {
      setLoading(false);
    }
  };

  /* const routerBak = () => {
    if(path) === 'flights' {
      router.push('/')
    }
  } */

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
      {loading && <Loading />}
      <Box
        sx={{
          marginRight: { xs: '4vw', sm: '1.5vw' },
        }}
      >
        <Box onClick={() => router.push(adress)}>
          <ArrowBackIosIcon sx={{ cursor: 'pointer' }} />
        </Box>
      </Box>
      <Typography
        sx={{
          fontFamily: poppins.style.fontFamily,
          fontWeight: 500,
        }}
      >
        {label && isValidTranslationKey(label)
          ? t(label)
          : menuData?.label && isValidTranslationKey(menuData?.label)
          ? t(menuData?.label)
          : menuData?.label}
      </Typography>
    </Box>
  );
};

export default NavigationHeader;

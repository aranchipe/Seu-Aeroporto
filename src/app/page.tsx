'use client';
import CardMenu from '@/components/CardMenu';
import { Loading } from '@/components/Loading';
import { CardMenuProps } from '@/interfaces/home';
import axios from '@/services/axios';
import { poppins } from '@/styles/theme';
import { Box, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';

export default function Home() {
  const [menus, setMenus] = useState<CardMenuProps[] | null>(null);
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);

  const getMenus = async () => {
    try {
      const menuData: CardMenuProps[] = (await axios.get('/menu')).data.sort((a: CardMenuProps, b: CardMenuProps) => {
        return a.order && b.order && a.order - b.order;
      });

      setMenus(menuData);
    } catch (error) {
      console.error('Error when searching for menu data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);

    getMenus();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F3F2F2',
        marginTop: '12vh',
        padding: '0 7vw',
        minHeight: '78vh',
      }}
    >
      {loading && <Loading />}
      {!loading && menus && menus.length > 0 && (
        <>
          <Box
            sx={{
              marginBottom: '4vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="h5"
              fontWeight={'bold'}
              sx={{
                fontFamily: poppins.style.fontFamily,
                fontWeight: 800,
              }}
            >
              {t('welcome')}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                fontFamily: poppins.style.fontFamily,
                fontWeight: 400,
                color: '#000000CC',
              }}
            >
              {t('Como podemos ajuda-lo?')}
            </Typography>
          </Box>

          <Grid
            container
            spacing={2}
            sx={{
              maxWidth: '600px',
            }}
          >
            {menus?.map((item, index) => (
              <Grid
                key={item.id || index}
                item
                xs={item.order === 1 ? 8 : item.order === 2 ? 4 : item.order === 3 ? 4 : item.order === 4 ? 8 : 12}
              >
                <Link href={item.ref ?? ''}>
                  <CardMenu
                    label={item.label}
                    backgroundColor={item.backgroundColor}
                    textColor={item.textColor}
                    icon={item.icon}
                    size={item.order === 1 || item.order === 4 ? 'large' : item.order === 5 ? 'medium' : ''}
                  />
                </Link>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
}

'use client';

import CardEntityMap from '@/components/CardEntityMap';
import EntitiesTable from '@/components/EntitiesTable';
import FlightsTable from '@/components/FlightsTable';
import InputFilter from '@/components/InputFilter';
import { Loading } from '@/components/Loading';
import NavigationHeader from '@/components/NavigationHeader';
import SegmentButton from '@/components/SegmentButton';
import { useTranslation } from '@/hooks/useTranslation';
import { EntitiesProps } from '@/interfaces/[path]';
import mockFlights from '@/mocks/mockFlights.json';
import axios from '@/services/axios';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, CardMedia, Grid } from '@mui/material';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const mapImage =
  'https://s3-alpha-sig.figma.com/img/bd3d/f7a9/a95931faaa9535a55f37ca4e104b0d82?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZFzCrTG3WKuY2DDm1OuUX7nrSoIzvcyaE5DK1iebqvTDssaaL8az77NWcJXO8cM503PhtpEYhdGvEn4v~cuivuFkv41GINBKPzng-8OdKZObG564tLYldWykvFIO9qw~Y0Z40sWe7clugFTbmUZ7PHcCax845T52IaCpXcvra1KRjVaNt9jXmvfEFbiWDYL5Qg-CGWHWlrM83Rc2iSvLhZ~pNwlut8Jg2vSbDlkxWcn2QXA3to~nBKmM~TW8XC~xozj-G3pBtMMuEuqxZlm2-XW9Q15IXg9NLsfw5OVR4t7uUnPVCdeBeZflgS-BuWNGGkyOpPowwMThzNQ3GInNnw';

const windowSize = window.innerWidth;

const Page: React.FC = () => {
  const params = useParams();
  const { path } = params;
  const { t } = useTranslation();
  const [segments, setSegments] = useState<string | null>(path === 'services' ? 'Loja' : '');

  const [options, setOptions] = useState<EntitiesProps[] | null>(null);
  const [filteredOptions, setFilteredOptions] = useState<EntitiesProps[] | null>(null);

  const [currentFlights, setCurrentFlights] = useState(mockFlights);

  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [boxPosition, setBoxPosition] = useState<string>('-100%');

  const [cardEntityMapOpen, setCardEntityMapOpen] = useState<boolean>(false);
  const [entityName, setEntityName] = useState<EntitiesProps>();

  const [loading, setLoading] = useState<boolean>(false);

  const getOptions = async (path?: string | string[], segment?: string) => {
    setOptions(null);
    setLoading(true);
    try {
      const entities: EntitiesProps[] =
        path === 'services' && segment
          ? (await axios.get(`entidades?path=${path}&segment=${segment}`)).data
          : (await axios.get(`entidades?path=${path}`)).data;

      setOptions(entities);
      setFilteredOptions(entities);
    } catch (error) {
      console.error('Error when searching for restaurants:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (path && path !== 'map') {
      getOptions(path, segments || undefined);
    }
  }, [path, segments]);

  useEffect(() => {
    if (openMenu) {
      setBoxPosition(windowSize < 600 ? '30vh' : '28vh');
    } else {
      setTimeout(() => {
        setBoxPosition('-100%');
      }, 100);
    }
  }, [openMenu]);

  useEffect(() => {
    const handleScroll = () => {
      if (openMenu) {
        setOpenMenu(false);
        setSegments('');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [openMenu]);

  return (
    <Box>
      {loading && <Loading />}
      <NavigationHeader path={String(path)} />
      <Box
        sx={{
          marginTop: '18vh',
          marginBottom: '10vh',
          padding: windowSize > 600 ? '3vh 3vw 2vh 3vw' : '3vh 0 0 0',
          display: 'flex',
          justifyContent: 'center',
          minHeight: '72vh',
        }}
      >
        {path === 'flights' ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <InputFilter
              columnName={'number'}
              options={mockFlights}
              setFilteredOptions={setCurrentFlights}
              placeholder={t('Buscar voo pelo número. Ex:. 2349')}
            />
            <FlightsTable currentFlights={currentFlights} />
          </Box>
        ) : path === 'restaurants' ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <InputFilter
              columnName={'name'}
              options={options}
              setFilteredOptions={setFilteredOptions}
              placeholder={t('Busque um estabelecimento. Ex:. Spolleto')}
            />
            <EntitiesTable path={path} entitiesState={filteredOptions} />
          </Box>
        ) : path === 'services' ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Grid container spacing={2} sx={{ marginBottom: { xs: '5vh', sm: '3vh' }, height: '10%' }}>
              <Grid item xs={6}>
                <SegmentButton label="Lojas" setSegments={setSegments} segments={segments} />
              </Grid>
              <Grid item xs={6}>
                <SegmentButton label="Serviços" setSegments={setSegments} segments={segments} />
              </Grid>
            </Grid>
            <InputFilter
              columnName={'name'}
              options={options}
              setFilteredOptions={setFilteredOptions}
              placeholder={t('Busque um estabelecimento. Ex:. Spolleto')}
            />
            <EntitiesTable path={path} entitiesState={filteredOptions} />
          </Box>
        ) : path === 'map' ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box>
              <InputFilter
                columnName={'name'}
                options={options}
                setFilteredOptions={setFilteredOptions}
                placeholder={t('Busque um estabelecimento. Ex:. Spolleto')}
              />

              <Grid
                container
                spacing={2}
                sx={{ marginBottom: { xs: '3vh', sm: '5vh' }, height: '10%', position: 'relative' }}
              >
                <Grid item xs={6}>
                  <SegmentButton
                    label="Restaurantes"
                    setSegments={setSegments}
                    segments={segments}
                    menuType="restaurants"
                    setOpenMenu={setOpenMenu}
                    getOptions={getOptions}
                  />
                </Grid>
                <Grid item xs={6}>
                  <SegmentButton
                    label="Lojas"
                    setSegments={setSegments}
                    segments={segments}
                    menuType="services"
                    setOpenMenu={setOpenMenu}
                    getOptions={getOptions}
                  />
                </Grid>
                <Grid item xs={6}>
                  <SegmentButton
                    label="Serviços"
                    setSegments={setSegments}
                    segments={segments}
                    menuType="services"
                    setOpenMenu={setOpenMenu}
                    getOptions={getOptions}
                  />
                </Grid>
                <Grid item xs={6}>
                  <SegmentButton label="Outros" />
                </Grid>
              </Grid>
              {cardEntityMapOpen && (
                <CardEntityMap setCardEntityMapOpen={setCardEntityMapOpen} entityName={entityName} />
              )}
            </Box>
            {openMenu && (
              <Box
                sx={{
                  position: 'fixed',
                  top: boxPosition,
                  display: 'flex',
                  flexDirection: 'column',
                  mb: '15vh',
                  alignItems: 'center',
                  zIndex: 2,
                  backgroundColor: '#ffffff',
                  maxHeight: '50vh',
                  transition: 'top 1s ease-in-out',
                }}
              >
                <EntitiesTable
                  setCardEntityMapOpen={setCardEntityMapOpen}
                  entitiesState={filteredOptions}
                  setOpenMenu={setOpenMenu}
                  setEntityName={setEntityName}
                />

                <Box
                  onClick={() => {
                    setOpenMenu(false);
                    setSegments('');
                  }}
                >
                  <KeyboardArrowUpIcon sx={{ bottom: '0', cursor: 'pointer' }} />
                </Box>
              </Box>
            )}
            <CardMedia
              component="img"
              image={mapImage}
              alt="Restaurant Logo"
              sx={{ width: windowSize < 600 ? '100%' : '100%', borderRadius: '10px', mb: '10vh' }}
            />
          </Box>
        ) : (
          <Box sx={{ height: '67vh' }}>
            <iframe
              src="https://salvador-airport.strelo.com.br/"
              style={
                windowSize > 600
                  ? {
                      width: '20vw',
                      height: '100%',
                      border: 'none',
                    }
                  : {
                      width: '100vw',
                      height: '100%',
                      border: 'none',
                    }
              }
            ></iframe>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Page;

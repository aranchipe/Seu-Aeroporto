'use client';

import { poppins } from '@/app/fonts';
import { Loading } from '@/components/Loading';
import NavigationHeader from '@/components/NavigationHeader';
import OperatingHoursStatus from '@/components/OperatingHoursStatus';
import TransitionsPopper from '@/components/PopperOpeningHours';
import { useTranslation } from '@/hooks/useTranslation';
import { EntitiesProps } from '@/interfaces/[path]';
import axios from '@/services/axios';
import { formatPhoneNumber } from '@/utils/formatPhone';
import { isValidTranslationKey } from '@/utils/translationKeyValidation';
import CallIcon from '@mui/icons-material/Call';
import { Box, CardMedia, Typography } from '@mui/material';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const mapImage =
  'https://s3-alpha-sig.figma.com/img/bd3d/f7a9/a95931faaa9535a55f37ca4e104b0d82?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZFzCrTG3WKuY2DDm1OuUX7nrSoIzvcyaE5DK1iebqvTDssaaL8az77NWcJXO8cM503PhtpEYhdGvEn4v~cuivuFkv41GINBKPzng-8OdKZObG564tLYldWykvFIO9qw~Y0Z40sWe7clugFTbmUZ7PHcCax845T52IaCpXcvra1KRjVaNt9jXmvfEFbiWDYL5Qg-CGWHWlrM83Rc2iSvLhZ~pNwlut8Jg2vSbDlkxWcn2QXA3to~nBKmM~TW8XC~xozj-G3pBtMMuEuqxZlm2-XW9Q15IXg9NLsfw5OVR4t7uUnPVCdeBeZflgS-BuWNGGkyOpPowwMThzNQ3GInNnw';

const gapImage =
  'https://s3-alpha-sig.figma.com/img/1010/7c2a/07db67a613a07fd4539f1be466881c64?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oUsYO~C1XlWkmXYExcK3mHd~88Pw0Lzvy~4INrka4mC6aATSqe3WiqPuemuzeAwQD662~aXz8tf0V~jWGwIcsv5iwIQNBTJzZ7xKu0-vgmM2zpA4EPJ6Ggv1IAgi6dP1G4RQcPkWyaaLI8rf2RRJUQfZdy9lbiUGZUMl3DgqpthOG7n6ZeZMD1Dos2jkwwKoUBIeOTQrmV7VA2VVG7fjJAtqzXT~Ib1TR9dmsevwxJh0cz7CNMg19gmIGOtPhSIWcZGr2SFtHc54SUQMf3tfhBKPrA-nzYoU9PqMPp8U9WvkcJVVyGJAv8h~qw7b5Ypk0ML2sGH1EIkhrgxYr8k2Cw__';

const Page = () => {
  const params = useParams();
  const { entityName, path } = params;
  const [entityState, setEntityState] = useState<EntitiesProps | null>(null);
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    entityDetail();
  }, []);

  const entityDetail = async () => {
    setLoading(true);
    try {
      if (entityName) {
        const entity: EntitiesProps = (await axios.get(`/entidades/${entityName}`)).data;
        setEntityState(entity);
      }
    } catch (error) {
      console.error('Error when searching for entity:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      {loading && <Loading />}
      {!loading && (
        <>
          <NavigationHeader adress="/services" path={String(path)} label={entityState?.segments[0]} />
          <Box
            sx={{
              width: '100vw',
              marginTop: '18vh',
              marginBottom: '10vh',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '72vh',
              backgroundColor: '#ffffff',
              color: '#000000',
            }}
          >
            {entityName === 'GAP' && (
              <CardMedia component="img" image={gapImage} sx={{ width: '100%', height: { xs: '20vh', sm: '30vh' } }} />
            )}
            <Box sx={{ padding: '3vh 3vw 2vh 3vw ' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {entityState?.logo && (
                  <Box sx={{ marginRight: '2vw' }}>
                    <CardMedia
                      component="img"
                      image={entityState.logo}
                      alt="Restaurant Logo"
                      sx={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #D3D3D3' }}
                    />
                  </Box>
                )}

                <Typography
                  variant="h5"
                  fontWeight={'bold'}
                  sx={{
                    fontFamily: poppins.style.fontFamily,
                    fontWeight: 600,
                  }}
                >
                  {entityState?.name}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', paddingTop: '3vh', marginBottom: '5vh' }}>
                <Typography
                  variant="h5"
                  fontWeight={'bold'}
                  sx={{
                    fontFamily: poppins.style.fontFamily,
                    fontWeight: 600,
                    fontSize: '16px',
                  }}
                >
                  {t('Horário de Funcionamento')}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <OperatingHoursStatus openingHours={entityState?.openingHours} />
                  <TransitionsPopper openingHours={entityState?.openingHours} />
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography
                  variant="h5"
                  fontWeight={'bold'}
                  sx={{
                    fontFamily: poppins.style.fontFamily,
                    fontWeight: 600,
                    fontSize: '16px',
                  }}
                >
                  {t('Contatos')}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    marginBottom: '5vh',
                    gap: '10px',
                  }}
                >
                  <CallIcon />
                  <Typography
                    sx={{
                      fontFamily: poppins.style.fontFamily,
                      fontWeight: 400,
                      fontSize: '14px',
                    }}
                  >
                    {formatPhoneNumber(entityState?.phone ?? '')}
                  </Typography>
                </Box>
                <Box sx={{ marginBottom: '3vh' }}>
                  <Typography
                    variant="h5"
                    fontWeight={'bold'}
                    sx={{
                      fontFamily: poppins.style.fontFamily,
                      fontWeight: 600,
                      fontSize: '16px',
                    }}
                  >
                    {t('Localização')}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: poppins.style.fontFamily,
                      fontWeight: 400,
                      fontSize: '14px',
                    }}
                  >
                    {entityState?.address && isValidTranslationKey(entityState?.address)
                      ? t(entityState?.address)
                      : entityState?.address}
                  </Typography>
                </Box>
                <Box>
                  <CardMedia
                    component="img"
                    image={mapImage}
                    alt="Restaurant Logo"
                    sx={{ width: { xs: '100%', sm: '50%' }, borderRadius: '10px' }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Page;

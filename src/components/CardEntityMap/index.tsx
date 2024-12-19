import { poppins } from '@/app/fonts';
import { useTranslation } from '@/hooks/useTranslation';
import { EntitiesProps } from '@/interfaces/[path]';
import axios from '@/services/axios';
import { formatPhoneNumber } from '@/utils/formatPhone';
import { isValidTranslationKey } from '@/utils/translationKeyValidation';
import CallIcon from '@mui/icons-material/Call';
import { Box, CardMedia, ClickAwayListener, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import OperatingHoursStatus from '../OperatingHoursStatus';
import TransitionsPopper from '../PopperOpeningHours';

const qrCode =
  'https://s3-alpha-sig.figma.com/img/307d/1758/58a86e5cfd6282d82effca68cda33c24?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Yqqytd28tuhd7oPtUdvea9Ru2lefLargnLXgipBD6uadMRPLanIsMZZW6ICSa2KvQb43pd1mbORxbcGj2lpN7OHVGlOgzvFLm3PMyE2MlV175OnCgMojLBfe8PIAyTORl1aHZFDfxjm5RYKGmSOew3cSG60BRbAG0QTdekFvKEWH9f6rvf4Y~t3PacFUTeQ3XW0qbi2kmbSqKbt7UaAwbm3cLO2ZMGtt6lV26EoknlQe22T6sfztRzp4UBIMPM3BMXofnOt9lddP30o2P1HaQi5ujySxxrLKADWUq5wybVMX9ay5EQrEFVE~WsKZqKotOhP~z4w6C~TSy-uWDCMEhQ__';

interface CardEntityMapProps {
  setCardEntityMapOpen: React.Dispatch<React.SetStateAction<any>>;
  entityName?: EntitiesProps;
}

const CardEntityMap: React.FC<CardEntityMapProps> = ({ setCardEntityMapOpen, entityName }) => {
  const [entityState, setEntityState] = useState<EntitiesProps | null>(null);
  const { t } = useTranslation();

  const entityDetail = async () => {
    try {
      const entity: EntitiesProps = (await axios.get(`/entidades/${entityName}`)).data;
      setEntityState(entity);
    } catch (error) {
      console.error('Erro ao buscar entidade:', error);
    } finally {
    }
  };

  useEffect(() => {
    entityDetail();
  }, []);

  return (
    <ClickAwayListener onClickAway={() => setCardEntityMapOpen(false)}>
      <Box
        sx={{
          backgroundColor: 'white',
          border: '1px solid #e0e0e0',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          padding: '16px',
          width: { xs: '80%', sm: '20%' },
          position: 'absolute',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Box>
            <CardMedia
              component="img"
              image={entityState?.logo}
              alt="Restaurant Logo"
              sx={{ width: '70px', height: '70px', borderRadius: '50%', border: '1px solid #D3D3D3' }}
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography>{entityState?.name}</Typography>

            <Typography>
              {entityState?.serviceCategories.map((item) =>
                entityState?.serviceCategories.length > 1 ? `${item},` : `${item}`,
              )}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', paddingTop: '3vh', marginBottom: '2vh' }}>
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
        <Box>
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
              marginBottom: '3vh',
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
        <CardMedia component="img" image={qrCode} alt="QR code" sx={{ width: '20%' }} />
      </Box>
    </ClickAwayListener>
  );
};

export default CardEntityMap;

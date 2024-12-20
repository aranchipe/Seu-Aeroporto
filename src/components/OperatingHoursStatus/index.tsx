import { poppins } from '@/app/fonts';
import { useTranslation } from '@/hooks/useTranslation';
import { openingHoursProps } from '@/interfaces/[path]';
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

interface OperatingHoursStatusProps {
  openingHours?: openingHoursProps;
}

const OperatingHoursStatus = ({ openingHours }: OperatingHoursStatusProps) => {
  const { t } = useTranslation();
  const [statusState, setStatusState] = useState('');

  const getCurrentDayName = (): keyof openingHoursProps => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = new Date().getDay();
    return days[today] as keyof openingHoursProps;
  };

  const getCurrentTimeInMinutes = () => {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  };

  const convertTimeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  useEffect(() => {
    const currentDayHours = openingHours?.[getCurrentDayName()];
    const currentTimeInMinutes = getCurrentTimeInMinutes();

    const foundHorario = currentDayHours?.find((horario) => {
      return (
        currentTimeInMinutes >= convertTimeToMinutes(horario.open) &&
        currentTimeInMinutes < convertTimeToMinutes(horario.close)
      );
    });

    const status = foundHorario ? `${foundHorario.open} - ${foundHorario.close}` : 'Fechado';

    setStatusState(status);
  }, [openingHours]);

  return (
    <Box sx={statusState !== 'Fechado' ? { color: 'green' } : {}}>
      <Typography
        variant="h5"
        sx={{
          fontFamily: poppins.style.fontFamily,
          fontWeight: 400,
          fontSize: '18px',
        }}
      >
        {statusState === 'Fechado' ? t('Fechado') : statusState}
      </Typography>
    </Box>
  );
};

export default OperatingHoursStatus;

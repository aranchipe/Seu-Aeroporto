import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Image from 'next/image';
import React from 'react';
import logoRight from '../../../public/assets/logo-right.jpg';
import logoSeuAeroporto from '../../../public/assets/logo-seu-aeroporto.jpg';
import SimplePopper from '../PopperLanguage';

interface MeuComponenteProps {
  type: string;
}

const Bar: React.FC<MeuComponenteProps> = ({ type }) => {
  const houseIcon =
    'https://storage.googleapis.com/media.landbot.io/79288/chats/494a361c-2ddc-48ff-8dd7-f4e121043d68/M19CXVLFIQ76KENHKVBZ936575H7XO46.svg';

  return (
    <Box
      sx={{
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'fixed',
        backgroundColor: '#ffffff',
        ...(type === 'header'
          ? { top: 0, height: '12vh', padding: '5vh 5vw' }
          : { bottom: 0, height: '10vh', padding: '4vh 1vw' }),
        zIndex: 10,
      }}
    >
      <Box
        sx={{
          width: { xs: '150px', sm: '200px', md: '400px' },
        }}
      >
        {type === 'header' ? (
          <Box>
            <Image layout="responsive" alt="Picture of the author" src={logoSeuAeroporto} />
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <IconButton
              sx={{
                width: { xs: '50px', sm: '70px', md: '70px' },
                height: { xs: '50px', sm: '70px', md: '70px' },
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                padding: '4%',
              }}
              href="/"
            >
              <Image layout="responsive" width={1} height={1} alt="icone" src={houseIcon} />
            </IconButton>

            <SimplePopper />
          </Box>
        )}
      </Box>

      <Box
        sx={{
          ...(type === 'header' ? { width: { xs: '50px', sm: '90px', md: '125px' } } : ''),
        }}
      >
        {type === 'header' ? (
          <Image layout="responsive" alt="Picture of the author" src={logoRight} />
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'end',
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontWeight: 400,
                color: '#000000CC',
              }}
            >
              {`${format(new Date(), "EEE, dd 'de' MMM", { locale: ptBR })}.`}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 500,
              }}
            >
              {format(new Date(), 'HH:mm')}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Bar;

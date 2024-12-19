'use client';
import { Box, IconButton, MenuItem, Popper, Typography } from '@mui/material';
import { css, styled } from '@mui/system';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { createContext, useState } from 'react';
import english from '../../../public/assets/english.png';
import portuguese from '../../../public/assets/portuguese.png';
import spain from '../../../public/assets/spain.png';
import { Language } from '../../utils/translations';

export const languages: Record<Language, string> = {
  en: 'EUA',
  es: 'Espanha',
  pt: 'Brasil',
};

export const LanguageContext = createContext({
  language: 'pt' as Language,
  setLanguage: (lang: Language) => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('pt');

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>;
}

export default function SimplePopper() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const { language, setLanguage } = React.useContext(LanguageContext);

  const handleLanguageChange = (lang: Language) => {
    return (event: React.MouseEvent<HTMLElement>) => {
      setLanguage(lang);
      localStorage.setItem('language', lang);
      router.refresh();
    };
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <div>
      <IconButton
        sx={{
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          alignItems: 'center',
          width: { xs: '50px', sm: '70px', md: '70px' },
          height: { xs: '50px', sm: '70px', md: '70px' },
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          borderRadius: '50%',
          padding: { xs: '4px 8px', sm: '8px 16px', md: '8px 16px' },
        }}
        onClick={handleClick}
      >
        <Image
          layout="responsive"
          width={1}
          height={1}
          alt="icone"
          src={language === 'pt' ? portuguese : language === 'en' ? english : spain}
        />
      </IconButton>

      <Popper id={id} open={open} anchorEl={anchorEl} placement="auto">
        <StyledPopperDiv>
          <Box onClick={handleClick}>
            <MenuItem onClick={handleLanguageChange('pt')}>
              <Image style={{ marginRight: '7%' }} width={30} alt="icone" src={portuguese} />
              <Typography>Português</Typography>
            </MenuItem>
          </Box>
          <Box onClick={handleClick}>
            <MenuItem onClick={handleLanguageChange('es')}>
              <Image style={{ marginRight: '7%' }} width={30} alt="icone" src={spain} />
              <Typography>Español</Typography>
            </MenuItem>
          </Box>
          <Box onClick={handleClick}>
            <MenuItem onClick={handleLanguageChange('en')}>
              <Image style={{ marginRight: '7%' }} width={30} alt="icone" src={english} />
              <Typography>English</Typography>
            </MenuItem>
          </Box>
        </StyledPopperDiv>
      </Popper>
    </div>
  );
}

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const StyledPopperDiv = styled('div')(
  ({ theme }) => css`
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: ${theme.palette.mode === 'dark' ? `0px 4px 8px rgb(0 0 0 / 0.7)` : `0px 4px 8px rgb(0 0 0 / 0.1)`};
    padding: 0.75rem;
    color: ${theme.palette.mode === 'dark' ? grey[100] : grey[700]};
    font-size: 0.875rem;
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 500;
    opacity: 1;
    margin: 0.25rem 0;
  `,
);

"use client"
import * as React from 'react';
import { Popper } from '@mui/base/Popper';
import { styled, css } from '@mui/system';
import Image from "next/image";
import portuguese from '../../../public/assets/portuguese.png'
import spain from '../../../public/assets/spain.png'
import english from '../../../public/assets/english.png'
import { Button, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';

export default function SimplePopper() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const { i18n } = useTranslation();
    const router = useRouter();

    React.useEffect(() => {
        const savedLocale = localStorage.getItem('i18nextLng');
        if (savedLocale) {
            i18n.changeLanguage(savedLocale);
        }
    }, [i18n]);



    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const changeLanguage = (lng: string) => {
        return () => {
            i18n.changeLanguage(lng);
            localStorage.setItem('i18nextLng', lng); // Salva o idioma no localStorage
            router.refresh();  // Recarrega a página para aplicar as mudanças de idioma
        };
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    return (
        <div>
            <IconButton sx={{

                display: "flex",
                justifyContent: 'center',
                backgroundColor: '#ffffff',
                alignItems: "center",
                width: { xs: '50px', sm: '70px', md: '70px' },
                height: { xs: '50px', sm: '70px', md: '70px' },
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                borderRadius: '50%',
                padding: { xs: '4px 8px', sm: '8px 16px', md: '8px 16px' },

            }} onClick={handleClick}>

                <Image
                    layout="responsive"
                    width={1}
                    height={1}
                    alt='icone'
                    src={portuguese} />

            </IconButton>

            <Popper id={id} open={open} anchorEl={anchorEl} placement='auto'>
                <StyledPopperDiv>
                    <MenuItem onClick={changeLanguage('pt')}>
                        <Image
                            style={{ marginRight: '7%' }}
                            width={30}
                            alt='icone'
                            src={portuguese}
                        />
                        <Typography >
                            Português
                        </Typography>
                    </MenuItem>
                    <MenuItem onClick={changeLanguage('en')}>
                        <Image
                            style={{ marginRight: '7%' }}
                            width={30}
                            alt='icone'
                            src={spain}
                        />
                        <Typography >
                            Español
                        </Typography>
                    </MenuItem>
                    <MenuItem onClick={changeLanguage('es')}>
                        <Image
                            style={{ marginRight: '7%' }}
                            width={30}
                            alt='icone'
                            src={english}
                        />
                        <Typography >
                            English
                        </Typography>
                    </MenuItem>
                </StyledPopperDiv>
            </Popper>
        </div>
    );
}

const blue = {
    50: '#F0F7FF',
    100: '#C2E0FF',
    200: '#99CCF3',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0059B2',
    800: '#004C99',
    900: '#003A75',
};

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

const TriggerButton = styled('button')(

);

const StyledPopperDiv = styled('div')(
    ({ theme }) => css`
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: ${theme.palette.mode === 'dark'
            ? `0px 4px 8px rgb(0 0 0 / 0.7)`
            : `0px 4px 8px rgb(0 0 0 / 0.1)`};
    padding: 0.75rem;
    color: ${theme.palette.mode === 'dark' ? grey[100] : grey[700]};
    font-size: 0.875rem;
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 500;
    opacity: 1;
    margin: 0.25rem 0;
  `,
);

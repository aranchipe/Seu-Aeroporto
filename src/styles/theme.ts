'use client';

import { ButtonProps } from '@mui/material/Button';
import { createTheme } from '@mui/material/styles';

import { Inter, Poppins, Roboto_Mono } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
});

export const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '800'],
});

declare module '@mui/material/styles' {
  interface Palette {
    main: {
      primary: string;
      secondary: string;
      third: string;
      fourth: string;
      fifth: string;
      sixth: string;
    };
    words: {
      primary: string;
      secondary: string;
      third: string;
    };
  }

  interface PaletteOptions {
    main: {
      primary: string;
      secondary: string;
      third: string;
      fourth: string;
      fifth: string;
      sixth: string;
    };
    words: {
      primary: string;
      secondary: string;
      third: string;
    };
  }
}

export const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 1080,
    lg: 1200,
    xl: 1500,
    xxl: 1800,
  },
};

let theme = createTheme({
  breakpoints,
  palette: {
    error: {
      main: '#ff1744',
    },
    success: {
      main: '#306edc',
    },
    warning: {
      main: '#ffba5d',
    },
    main: {
      primary: '#306edc',
      secondary: '#459fff',
      third: '#fafafa',
      fourth: '#FFFFFF',
      fifth: '#edeef4',
      sixth: ' #CED8E0',
    },
    words: {
      primary: '#181818',
      secondary: '#383838',
      third: '#e3f1ff',
    },
  },
  typography: {
    fontFamily: `'Inter', sans-serif`,
    h1: {
      fontWeight: 700,
      fontSize: '3.6rem',
    },
    h2: {
      fontWeight: 700,
      fontSize: '3.2rem',
    },
    h3: {
      fontWeight: 700,
      fontSize: '2.8rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '2.4rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.6rem',
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: '1.5rem',
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: '1.4rem',
    },
    body1: {
      fontWeight: 400,
      fontSize: '1.3rem',
    },
    body2: {
      fontWeight: 400,
      fontSize: '1.2rem',
    },
  },
});

theme = createTheme(theme, {
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }: { ownerState: ButtonProps }) => ({
          ...(ownerState.variant === 'contained' && {
            background: theme.palette.main.primary,
            color: theme.palette.words.third,
            fontWeight: 600,
            fontSize: '1.6rem',
            textTransform: 'none',
            height: '3.5rem',
            ':hover': {
              background: theme.palette.main.third,
              color: theme.palette.main.primary,
            },
          }),
          ...(ownerState.variant === 'outlined' && {
            borderColor: theme.palette.main.primary,
            color: theme.palette.main.primary,
            fontWeight: 600,
            fontSize: '1.6rem',
            textTransform: 'none',
            height: '3.5rem',
            ':hover': {
              background: theme.palette.main.primary,
              borderColor: theme.palette.main.primary,
              color: theme.palette.words.third,
            },
          }),
        }),
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          '&.Mui-checked': {
            color: theme.palette.main.primary,
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          '& .MuiSvgIcon-root': { fontSize: 22, color: theme.palette.words.secondary },
          '&.Mui-checked': {
            color: theme.palette.main.primary,
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.main.sixth,
          },
          '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.main.sixth,
          },
          '&.Mui-focused .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.main.sixth,
          },
        },
      },
    },
  },
});

export default theme;

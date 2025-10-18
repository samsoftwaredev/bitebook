// theme.dark.ts
import { alpha, createTheme } from '@mui/material/styles';

const BRAND = {
  teal: '#0FB77A',
  tealDark: '#0A7F56',
  tealLight: '#AEEAD7',
  mintWash: '#07332A', // subtle mint cast for surfaces
  bg0: '#0E1715', // app background
  bg1: '#0F1D1A', // paper background
  text1: '#E9F4F0',
  text2: '#B7CAC4',
  yellow: '#FFE847',
  blue: '#60A5FA',
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#F87171',
  divider: '#1F2D2A',
};

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: BRAND.teal,
      light: BRAND.tealLight,
      dark: BRAND.tealDark,
      contrastText: '#061611',
    },
    secondary: {
      main: BRAND.yellow,
      contrastText: '#0C1311',
    },
    success: { main: BRAND.success },
    info: { main: BRAND.blue },
    warning: { main: BRAND.warning },
    error: { main: BRAND.error },
    background: {
      default: BRAND.bg0,
      paper: BRAND.bg1,
    },
    text: {
      primary: BRAND.text1,
      secondary: BRAND.text2,
    },
    divider: BRAND.divider,
  },

  shape: { borderRadius: 18 },

  typography: {
    fontFamily: [
      'Inter',
      'SF Pro Text',
      'Helvetica Neue',
      'Roboto',
      'Arial',
      'system-ui',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 800,
      fontSize: '3rem',
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
    },
    h2: { fontWeight: 800, fontSize: '2.1rem', lineHeight: 1.15 },
    h3: { fontWeight: 700, fontSize: '1.6rem' },
    body1: { fontSize: '1rem', lineHeight: 1.7 },
    body2: { fontSize: '.95rem', lineHeight: 1.65, color: BRAND.text2 },
    button: { textTransform: 'none', fontWeight: 700, letterSpacing: 0 },
  },

  shadows: [
    'none',
    '0 10px 28px rgba(0,0,0,.35)',
    '0 12px 36px rgba(0,0,0,.45)',
    '0 14px 40px rgba(0,0,0,.45)',
    '0 14px 40px rgba(0,0,0,.45)',
    '0 14px 40px rgba(0,0,0,.45)',
    '0 14px 40px rgba(0,0,0,.45)',
    '0 14px 40px rgba(0,0,0,.45)',
    '0 14px 40px rgba(0,0,0,.45)',
    '0 14px 40px rgba(0,0,0,.45)',
    '0 14px 40px rgba(0,0,0,.45)',
    '0 14px 40px rgba(0,0,0,.45)',
    '0 14px 40px rgba(0,0,0,.45)',
    '0 14px 40px rgba(0,0,0,.45)',
    '0 14px 40px rgba(0,0,0,.45)',
    '0 14px 40px rgba(0,0,0,.45)',
    '0 14px 40px rgba(0,0,0,.45)',
    '0 14px 40px rgba(0,0,0,.45)',
    '0 14px 40px rgba(0,0,0,.45)',
    '0 14px 40px rgba(0,0,0,.45)',
    '0 14px 40px rgba(0,0,0,.45)',
    '0 14px 40px rgba(0,0,0,.45)',
    '0 14px 40px rgba(0,0,0,.45)',
    '0 14px 40px rgba(0,0,0,.45)',
    '0 14px 40px rgba(0,0,0,.45)',
  ],

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: `radial-gradient(1100px 520px at 70% -10%, ${alpha(BRAND.mintWash, 0.75)} 0%, transparent 60%)`,
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: 24,
          boxShadow: '0 14px 42px rgba(0,0,0,.45)',
          border: `1px solid ${alpha('#ffffff', 0.04)}`,
        },
      },
    },

    MuiCard: {
      styleOverrides: { root: { borderRadius: 24, overflow: 'hidden' } },
    },

    MuiButton: {
      defaultProps: { size: 'large' },
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingInline: 18,
          boxShadow: '0 10px 24px rgba(15,183,122,.28)',
          '&:hover': { boxShadow: '0 12px 28px rgba(15,183,122,.34)' },
        },
        containedSecondary: {
          color: '#0E1513',
          boxShadow: '0 10px 24px rgba(255,232,71,.4)',
          '&:hover': { boxShadow: '0 12px 28px rgba(255,232,71,.5)' },
        },
        outlined: {
          borderWidth: 2,
          borderColor: alpha('#fff', 0.18),
          '&:hover': { borderWidth: 2, borderColor: alpha('#fff', 0.28) },
        },
      },
      variants: [
        {
          // Soft/tinted buttons for dark surfaces
          props: { variant: 'soft', color: 'primary' } as any,
          style: {
            backgroundColor: alpha(BRAND.teal, 0.14),
            color: BRAND.tealLight,
            boxShadow: 'none',
            '&:hover': { backgroundColor: alpha(BRAND.teal, 0.22) },
          },
        },
      ],
    },

    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 999, fontWeight: 700 },
        colorSuccess: {
          backgroundColor: alpha(BRAND.success, 0.16),
          color: '#CFFAD7',
        },
        colorInfo: {
          backgroundColor: alpha(BRAND.blue, 0.18),
          color: '#DBEAFE',
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: alpha('#ffffff', 0.04),
          borderRadius: 14,
          '& fieldset': { borderColor: alpha('#ffffff', 0.12) },
          '&:hover fieldset': { borderColor: alpha('#ffffff', 0.22) },
          '&.Mui-focused fieldset': { borderColor: BRAND.teal, borderWidth: 2 },
        },
        input: { color: BRAND.text1 },
      },
    },

    MuiLink: {
      styleOverrides: {
        root: {
          color: BRAND.tealLight,
          fontWeight: 600,
          '&:hover': { textDecorationColor: BRAND.teal },
        },
      },
    },

    MuiAlert: { styleOverrides: { root: { borderRadius: 16 } } },
    MuiBadge: {
      styleOverrides: {
        badge: { fontWeight: 700, border: `2px solid ${BRAND.bg0}` },
      },
    },
  },
});

// If you used the custom Button "soft" variant, add module augmentation:
/*
import '@mui/material/Button';
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides { soft: true; }
}
*/

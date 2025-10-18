// theme.ts
import { alpha, createTheme } from '@mui/material/styles';

const BRAND = {
  teal: '#0FB77A', // primary CTA / brand
  tealDark: '#0A7F56',
  tealLight: '#AEEAD7',
  mint0: '#F0FBF6', // lightest bg wash
  mint1: '#E6F7F1',
  text1: '#0C2A24', // near-black
  text2: '#46605B',
  yellow: '#FFE847', // secondary CTA
  blue: '#3B82F6', // info badges
  success: '#16A34A',
  warning: '#F59E0B',
  error: '#EF4444',
  divider: '#D7EAE4',
};

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: BRAND.teal,
      light: BRAND.tealLight,
      dark: BRAND.tealDark,
      contrastText: '#ffffffff',
    },
    secondary: {
      main: BRAND.yellow,
      contrastText: '#0D1B16',
    },
    success: { main: BRAND.success },
    info: { main: BRAND.blue },
    warning: { main: BRAND.warning },
    error: { main: BRAND.error },
    background: {
      default: BRAND.mint0,
      paper: '#FFFFFF',
    },
    text: {
      primary: BRAND.text1,
      secondary: BRAND.text2,
    },
    divider: BRAND.divider,
  },

  shape: {
    borderRadius: 18, // soft, rounded cards/buttons
  },

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
      fontSize: '3.25rem',
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 800,
      fontSize: '2.25rem',
      lineHeight: 1.15,
      letterSpacing: '-0.015em',
    },
    h3: { fontWeight: 700, fontSize: '1.75rem', lineHeight: 1.2 },
    body1: { fontSize: '1rem', lineHeight: 1.65 },
    body2: { fontSize: '.95rem', lineHeight: 1.6, color: BRAND.text2 },
    button: { textTransform: 'none', fontWeight: 700, letterSpacing: 0 },
  },

  shadows: [
    'none',
    '0 6px 16px rgba(15, 183, 122, 0.08)',
    '0 8px 24px rgba(2, 33, 25, 0.06)',
    '0 12px 32px rgba(2,33,25,0.06)',
    '0 12px 32px rgba(2,33,25,0.06)',
    '0 12px 32px rgba(2,33,25,0.06)',
    '0 12px 32px rgba(2,33,25,0.06)',
    '0 12px 32px rgba(2,33,25,0.06)',
    '0 12px 32px rgba(2,33,25,0.06)',
    '0 12px 32px rgba(2,33,25,0.06)',
    '0 12px 32px rgba(2,33,25,0.06)',
    '0 12px 32px rgba(2,33,25,0.06)',
    '0 12px 32px rgba(2,33,25,0.06)',
    '0 12px 32px rgba(2,33,25,0.06)',
    '0 12px 32px rgba(2,33,25,0.06)',
    '0 12px 32px rgba(2,33,25,0.06)',
    '0 12px 32px rgba(2,33,25,0.06)',
    '0 12px 32px rgba(2,33,25,0.06)',
    '0 12px 32px rgba(2,33,25,0.06)',
    '0 12px 32px rgba(2,33,25,0.06)',
    '0 12px 32px rgba(2,33,25,0.06)',
    '0 12px 32px rgba(2,33,25,0.06)',
    '0 12px 32px rgba(2,33,25,0.06)',
    '0 12px 32px rgba(2,33,25,0.06)',
    '0 12px 32px rgba(2,33,25,0.06)',
  ],

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: `radial-gradient(1200px 600px at 70% 0%, ${alpha(BRAND.mint1, 0.85)} 0%, transparent 60%)`,
        },
      },
    },

    MuiContainer: {
      defaultProps: { maxWidth: 'lg' },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          boxShadow: '0 10px 30px rgba(2,33,25,.06)',
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          overflow: 'hidden',
        },
      },
    },

    MuiButton: {
      defaultProps: { size: 'large' },
      styleOverrides: {
        root: {
          borderRadius: 999, // pill buttons like the hero
          paddingInline: 18,
          boxShadow: '0 8px 20px rgba(15,183,122,.22)',
          '&:hover': { boxShadow: '0 10px 24px rgba(15,183,122,.28)' },
        },
        containedSecondary: {
          boxShadow: '0 8px 20px rgba(255, 232, 71, .35)',
          '&:hover': { boxShadow: '0 10px 24px rgba(255, 232, 71, .45)' },
        },
        outlined: {
          borderWidth: 2,
          '&:hover': { borderWidth: 2 },
        },
      },
      variants: [
        // Soft (tinted) variant for minty chips/CTA-lites
        {
          props: { variant: 'soft', color: 'primary' } as any,
          style: {
            backgroundColor: alpha(BRAND.teal, 0.1),
            color: BRAND.tealDark,
            boxShadow: 'none',
            '&:hover': { backgroundColor: alpha(BRAND.teal, 0.16) },
          },
        },
      ],
    },

    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 999, fontWeight: 700 },
        colorSuccess: {
          backgroundColor: alpha(BRAND.success, 0.1),
          color: BRAND.success,
        },
        colorInfo: {
          backgroundColor: alpha(BRAND.blue, 0.12),
          color: BRAND.blue,
        },
      },
    },

    MuiLink: {
      styleOverrides: {
        root: {
          color: BRAND.tealDark,
          fontWeight: 600,
          '&:hover': { textDecorationColor: BRAND.teal },
        },
      },
    },

    MuiAlert: {
      styleOverrides: {
        root: { borderRadius: 16 },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          borderRadius: 14,
          '& fieldset': { borderColor: BRAND.divider },
          '&:hover fieldset': { borderColor: alpha(BRAND.teal, 0.6) },
          '&.Mui-focused fieldset': { borderColor: BRAND.teal, borderWidth: 2 },
        },
      },
    },

    MuiBadge: {
      styleOverrides: {
        badge: {
          fontWeight: 700,
          border: `2px solid ${BRAND.mint0}`,
        },
      },
    },
  },
});

// Optional module augmentation if you use the custom Button "soft" variant above.
// Create a file theme-augment.d.ts:
/*
import '@mui/material/Button';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    soft: true;
  }
}
*/

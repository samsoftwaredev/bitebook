import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
  alpha,
} from '@mui/material';
import React from 'react';

import { SideNavbar } from '@/components/Navbars';

const drawerWidth = 260;

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* Top app bar (mobile only) */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          display: { xs: 'block', md: 'none' },
          backgroundColor: '#fff',
          color: 'text.primary',
          borderBottom: (t) =>
            `1px solid ${alpha(t.palette.text.primary, 0.08)}`,
        }}
      >
        <Toolbar sx={{ gap: 1 }}>
          <IconButton edge="start" onClick={() => setMobileOpen(true)}>
            <MenuRoundedIcon />
          </IconButton>
          <Typography fontWeight={800}>Discover</Typography>
        </Toolbar>
      </AppBar>

      <SideNavbar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: '100%',
          px: 2,
          py: 10,
          backgroundColor: (t) => alpha(t.palette.text.primary, 0.02),
          minHeight: '100vh',
          // Tablet and up
          '@media (min-width: 600px)': {
            px: 3,
          },
          // Desktop and up
          '@media (min-width: 900px)': {
            py: 4,
            marginLeft: drawerWidth,
          },
        }}
      >
        <Container
          maxWidth="lg"
          disableGutters
          sx={{
            width: '100%',
            maxWidth: {
              xs: '100%',
              sm: '600px',
              md: '900px',
              lg: '1200px',
            },
            mx: 'auto',
          }}
        >
          {children}
        </Container>
      </Box>
    </Box>
  );
}

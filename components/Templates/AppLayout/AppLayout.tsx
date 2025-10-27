import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  alpha,
} from '@mui/material';
import React from 'react';

import { Logo } from '@/components';
import { SideNavbar } from '@/components/Navbars';
import { drawerWidth } from '@/constants/global';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <Box sx={{ display: 'flex' }}>
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
        <Toolbar
          sx={{ gap: 1, justifyContent: 'space-between', display: 'flex' }}
        >
          <IconButton edge="start" onClick={() => setMobileOpen(true)}>
            <MenuRoundedIcon />
          </IconButton>
          <Box textAlign="center" mt={1}>
            <Logo type="logo" size={42} />
          </Box>
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
            marginLeft: `${drawerWidth}px`,
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
